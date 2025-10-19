const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Dashboard de clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.render('clientes/clientes', { 
      titulo: 'Clientes', 
      clientes 
    });
  } catch (err) {
    res.status(500).send('Error al cargar los clientes');
  }
});

// Vista para crear nuevo cliente
router.get('/nuevo', (req, res) => {
  res.render('clientes/nuevo', { titulo: 'Nuevo Cliente' });
});

// Crear nuevo cliente
router.post('/nuevo', async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);

    const cliente = new Cliente({
      dni: req.body.dni,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      telefono: req.body.telefono,
      direccion: req.body.direccion
    });

    await cliente.save();
    res.redirect('/clientes');
  } catch (error) {
    console.log('Error detallado:', error.message); 
    res.status(400).send('Error al crear el cliente');
  }
});

// Vista para editar cliente
router.get('/editar/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).send('Cliente no encontrado');
    res.render('clientes/editar', { titulo: 'Editar Cliente', cliente });
  } catch (err) {
    res.status(500).send('Error al cargar el cliente');
  }
});

// Actualizar cliente
router.post('/editar/:id', async (req, res) => {
  try {
    await Cliente.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/clientes');
  } catch (err) {
    res.status(400).send('Error al actualizar el cliente');
  }
});

// Eliminar cliente
router.get('/eliminar/:id', async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.redirect('/clientes');
  } catch (err) {
    res.status(500).send('Error al eliminar el cliente');
  }
});

module.exports = router;
