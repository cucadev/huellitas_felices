const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Dashboard
router.get('/dashboard', (req, res) => res.redirect('/productos'));

// Listado
router.get('/', productoController.getProductos);

// Nuevo
router.get('/nuevo', productoController.formNuevoProducto);
router.post('/nuevo', productoController.createProducto);

// Editar
router.get('/editar/:id', productoController.formEditarProducto);
router.post('/editar/:id', productoController.updateProducto);

// Eliminar
router.get('/eliminar/:id', productoController.deleteProducto);

module.exports = router;




