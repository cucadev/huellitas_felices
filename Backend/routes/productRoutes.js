const express = require('express');
const router = express.Router();
const productoCtrl = require('../controllers/productoController');
const { auth } = require('../middlewares/auth');

// Rutas API
router.post('/', auth(['admin']), productoCtrl.crearProducto); // Crear producto
router.get('/', auth(), productoCtrl.obtenerProductos); // Listar productos en JSON
router.get('/:id', auth(), productoCtrl.obtenerProductoPorId); // Obtener producto por ID
router.put('/:id', auth(['admin']), productoCtrl.actualizarProducto); // Actualizar producto
router.delete('/:id', auth(['admin']), productoCtrl.eliminarProducto); // Eliminar producto

// Rutas para vistas (PUG)
router.get('/dashboard', auth(['admin']), productoCtrl.vistaProductos); // Lista en PUG
router.get('/nuevo', auth(['admin']), productoCtrl.formularioCrearProducto); // Formulario nuevo
router.post('/nuevo', auth(['admin']), productoCtrl.crearProducto); // Guardar nuevo producto
router.get('/editar/:id', auth(['admin']), productoCtrl.formularioEditarProducto); // Formulario editar
router.post('/editar/:id', auth(['admin']), productoCtrl.actualizarProducto); // Guardar edición
router.get('/eliminar/:id', auth(['admin']), productoCtrl.eliminarProducto); // Eliminar desde vista

module.exports = router;
