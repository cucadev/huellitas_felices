const express = require('express');
const router = express.Router();
const Compra = require('../models/Compra');
const Producto = require('../models/Producto');

// Listar compras
router.get('/', async (req, res) => {
  try {
    const compras = await Compra.find().populate('producto');
    res.render('compras/compras', { titulo: 'Compras', compras });
  } catch (error) {
    res.status(500).send('Error al cargar las compras: ' + error.message);
  }
});

// Formulario nueva compra
router.get('/nuevo', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render('compras/nuevo', { titulo: 'Nueva Compra', productos });
  } catch (error) {
    res.status(500).send('Error al cargar el formulario: ' + error.message);
  }
});

// Crear nueva compra
router.post('/nuevo', async (req, res) => {
  try {
    const { producto, cantidad, precioUnitario, proveedor } = req.body;
    const compra = new Compra({ producto, cantidad, precioUnitario, proveedor });
    await compra.save();

    // Actualizar stock del producto
    const prod = await Producto.findById(producto);
    if (prod) {
      prod.stock += parseInt(cantidad);
      await prod.save();
    }

    res.redirect('/compras');
  } catch (error) {
    res.status(400).send('Error al registrar la compra: ' + error.message);
  }
});

// Eliminar compra
router.get('/eliminar/:id', async (req, res) => {
  try {
    await Compra.findByIdAndDelete(req.params.id);
    res.redirect('/compras');
  } catch (error) {
    res.status(500).send('Error al eliminar la compra: ' + error.message);
  }
});

module.exports = router;
