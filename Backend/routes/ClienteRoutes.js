const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const Mascota = require('../models/Mascota');

// 📄 Listado de clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find().populate('mascotas', 'nombre especie');
    res.render('clientes/clientes', { 
      titulo: 'Clientes', 
      clientes,
      mensajeExito: null,
      mensajeError: null
    });
  } catch (err) {
    res.status(500).send('Error al cargar los clientes: ' + err.message);
  }
});

// 🆕 Formulario para crear nuevo cliente
router.get('/nuevo', async (req, res) => {
  try {
    const todasMascotas = await Mascota.find();
    res.render('clientes/nuevo', { 
      titulo: 'Nuevo Cliente', 
      todasMascotas,
      mensajeExito: null,
      mensajeError: null
    });
  } catch (err) {
    res.status(500).send('Error al cargar formulario: ' + err.message);
  }
});

// 💾 Crear nuevo cliente
router.post('/nuevo', async (req, res) => {
  try {
    const { dniCliente, nombre, apellido, email, telefono, direccion, observaciones, mascotas } = req.body;

    const nuevoCliente = new Cliente({
      dniCliente,
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      observaciones,
      mascotas: Array.isArray(mascotas) ? mascotas : mascotas ? [mascotas] : []
    });

    await nuevoCliente.save();

    const todasMascotas = await Mascota.find();
    res.render('clientes/nuevo', { 
      titulo: 'Nuevo Cliente', 
      todasMascotas,
      mensajeExito: 'Cliente creado correctamente',
      mensajeError: null
    });

  } catch (error) {
    const todasMascotas = await Mascota.find();
    res.render('clientes/nuevo', { 
      titulo: 'Nuevo Cliente', 
      todasMascotas,
      mensajeExito: null,
      mensajeError: 'Error al crear cliente: ' + error.message
    });
  }
});

// ✏️ Formulario para editar cliente
router.get('/editar/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id).populate('mascotas');
    if (!cliente) return res.status(404).send('Cliente no encontrado');

    const todasMascotas = await Mascota.find();
    res.render('clientes/editar', { 
      titulo: 'Editar Cliente', 
      cliente, 
      todasMascotas,
      mensajeExito: null,
      mensajeError: null
    });

  } catch (err) {
    res.status(500).send('Error al cargar cliente: ' + err.message);
  }
});

// 🔁 Actualizar cliente
router.post('/editar/:id', async (req, res) => {
  try {
    const { dniCliente, nombre, apellido, email, telefono, direccion, observaciones, mascotas } = req.body;

    const datosActualizados = {
      dniCliente,
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      observaciones,
      mascotas: Array.isArray(mascotas) ? mascotas : mascotas ? [mascotas] : []
    };

    const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, datosActualizados, { new: true, runValidators: true });
    if (!clienteActualizado) return res.status(404).send('Cliente no encontrado');

    const todasMascotas = await Mascota.find();
    res.render('clientes/editar', {
      titulo: 'Editar Cliente',
      cliente: clienteActualizado,
      todasMascotas,
      mensajeExito: 'Cliente actualizado correctamente',
      mensajeError: null
    });

  } catch (error) {
    const cliente = await Cliente.findById(req.params.id).populate('mascotas');
    const todasMascotas = await Mascota.find();
    res.render('clientes/editar', {
      titulo: 'Editar Cliente',
      cliente,
      todasMascotas,
      mensajeExito: null,
      mensajeError: 'Error al actualizar cliente: ' + error.message
    });
  }
});

module.exports = router;
