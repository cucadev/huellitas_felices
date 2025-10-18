import Mascota from '../models/Mascota.js';
import Cliente from '../models/Cliente.js';

// Listado de mascotas (dashboard)
export const vistaMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.find().populate('cliente');
    res.render('pages/mascotas/mascotas', { titulo: 'Listado de Mascotas', mascotas });
  } catch (error) {
    res.status(500).send('Error al cargar las mascotas: ' + error.message);
  }
};

// Formulario para crear mascota
export const formularioCrearMascota = async (req, res) => {
  try {
    const clientes = await Cliente.find(); 
    res.render('pages/mascotas/nuevo', { titulo: 'Nueva Mascota', clientes });
  } catch (error) {
    res.status(500).send('Error al cargar clientes: ' + error.message);
  }
};

// Crear mascota
export const crearMascota = async (req, res) => {
  try {
    const { nombre, especie, raza, edad, cliente, observaciones } = req.body;
    const nuevaMascota = new Mascota({ nombre, especie, raza, edad, cliente, observaciones });
    await nuevaMascota.save();
    res.redirect('/mascotas');
  } catch (error) {
    res.status(400).send('Error al crear mascota: ' + error.message);
  }
};

// Formulario para editar mascota
export const formularioEditarMascota = async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    const clientes = await Cliente.find();
    if (!mascota) return res.status(404).send('Mascota no encontrada');
    res.render('pages/mascotas/editar', { titulo: 'Editar Mascota', mascota, clientes });
  } catch (error) {
    res.status(500).send('Error al cargar mascota: ' + error.message);
  }
};

// Actualizar mascota
export const actualizarMascota = async (req, res) => {
  try {
    const datos = { ...req.body };
    await Mascota.findByIdAndUpdate(req.params.id, datos, { new: true, runValidators: true });
    res.redirect('/mascotas');
  } catch (error) {
    res.status(400).send('Error al actualizar mascota: ' + error.message);
  }
};

// Eliminar mascota
export const eliminarMascota = async (req, res) => {
  try {
    await Mascota.findByIdAndDelete(req.params.id);
    res.redirect('/mascotas');
  } catch (error) {
    res.status(500).send('Error al eliminar mascota: ' + error.message);
  }
};