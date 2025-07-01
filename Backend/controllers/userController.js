const User = require('../models/User');
const bcrypt = require('bcrypt'); //para encriptar contraseñas
const jwt = require('jsonwebtoken'); //json web token

exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el email ya existe
    const userExistente = await User.findOne({ email });
    if (userExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const nuevoUsuario = new User({
      nombre,
      email,
      password: passwordHash
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
    }

    // Comparar contraseñas
    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre },
      'secreto_clave', // Podés usar una variable de entorno luego
      { expiresIn: '1h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};
// GET /api/users  → Listar todos los usuarios
exports.obtenerUsuarios = async (_req, res) => {
  try {
    // Trae todo y oculta el campo password
    const usuarios = await User.find().select('-password');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

