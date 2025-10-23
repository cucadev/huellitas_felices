const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const Mascota = require('../models/Mascota');

// Listado de clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find().populate('mascotas', 'nombre');
    res.render('clientes/clientes', { titulo: 'Clientes', clientes });
  } catch (err) {
    res.status(500).send('Error al cargar los clientes: ' + err.message);
  }
});

// 🆕 Formulario para crear nuevo cliente
router.get('/nuevo', async (req, res) => {
  try {
    const mascotas = await Mascota.find();
    res.render('clientes/nuevo', { titulo: 'Nuevo Cliente', mascotas });
  } catch (err) {
    res.status(500).send('Error al cargar las mascotas: ' + err.message);
  }
});

// Crear nuevo cliente
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
    res.redirect('/clientes');
  } catch (error) {
    res.status(400).send('Error al crear el cliente: ' + error.message);
  }
});

// Formulario para editar cliente
router.get('/editar/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id).populate('mascotas', 'nombre');
    if (!cliente) return res.status(404).send('Cliente no encontrado');

    const mascotas = await Mascota.find();
    res.render('clientes/editar', { titulo: 'Editar Cliente', cliente, mascotas });
  } catch (err) {
    res.status(500).send('Error al cargar el cliente: ' + err.message);
  }
});

// Actualizar cliente
router.post('/editar/:id', async (req, res) => {
  try {
    const { dniCliente, nombre, apellido, email, telefono, direccion, observaciones, mascotas } = req.body;
    await Cliente.findByIdAndUpdate(req.params.id, {
      dniCliente,
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      observaciones,
      mascotas: Array.isArray(mascotas) ? mascotas : mascotas ? [mascotas] : []
    });
    res.redirect('/clientes');
  } catch (err) {
    res.status(400).send('Error al actualizar el cliente: ' + err.message);
  }
});

// Eliminar cliente
router.get('/eliminar/:id', async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.redirect('/clientes');
  } catch (err) {
    res.status(500).send('Error al eliminar el cliente: ' + err.message);
  }
});

module.exports = router;


