import express from 'express';
const router = express.Router();
import * as productoCtrl from '../controllers/productoController.js';
// import { auth } from '../middlewares/auth.js';  // DESCOMENTAR CUANDO USES AUTENTICACION MAYRA

// VISTAS PUG
router.get('/dashboard', /* auth(['admin']), */ productoCtrl.vistaProductos);
router.get('/nuevo', /* auth(['admin']), */ productoCtrl.formularioCrearProducto);
router.post('/nuevo', /* auth(['admin']), */ productoCtrl.crearProductoWeb);
router.get('/editar/:id', /* auth(['admin']), */ productoCtrl.formularioEditarProducto);
router.post('/editar/:id', /* auth(['admin']), */ productoCtrl.actualizarProductoWeb);
router.get('/eliminar/:id', /* auth(['admin']), */ productoCtrl.eliminarProductoWeb);

router.get('/', (req, res) => {
  res.redirect('/productos/dashboard');
});

// API REST
router.get('/api', productoCtrl.obtenerProductos);
router.get('/api/:id', productoCtrl.obtenerProductoPorId);
router.post('/api', productoCtrl.crearProducto);
router.put('/api/:id', productoCtrl.actualizarProducto);
router.delete('/api/:id', productoCtrl.eliminarProducto);

export default router;