const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Actualizar cliente
router.put('/:id', async (req, res) => {
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!clienteActualizado) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(clienteActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar cliente
router.delete('/:id', async (req, res) => {
  try {
    const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
    if (!clienteEliminado) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Crear nuevo cliente
router.post('/', async (req, res) => {
  const cliente = new Cliente({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    telefono: req.body.telefono,
    direccion: req.body.direccion
  });

  try {
    const nuevoCliente = await cliente.save();
    res.status(201).json({
  mensaje: 'Cliente creado con éxito',
  cliente: nuevoCliente
});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;