const express = require('express');
const router = express.Router();
const productoCtrl = require('../controllers/productoController');
const { auth } = require('../middlewares/auth');

//VISTAS PUG

router.get('/dashboard', /* auth(['admin']), */ productoCtrl.vistaProductos);
router.get('/nuevo', /* auth(['admin']), */ productoCtrl.formularioCrearProducto);
router.post('/nuevo', /* auth(['admin']), */ productoCtrl.crearProducto);
router.get('/editar/:id', /* auth(['admin']), */ productoCtrl.formularioEditarProducto);
router.post('/editar/:id', /* auth(['admin']), */ productoCtrl.actualizarProducto);
router.get('/eliminar/:id', /* auth(['admin']), */ productoCtrl.eliminarProducto);


router.get('/', (req, res) => {
  res.redirect('/productos/dashboard');
});

//API REST

router.get('/api', productoCtrl.obtenerProductos);
router.get('/api/:id', productoCtrl.obtenerProductoPorId);
router.post('/api', productoCtrl.crearProducto);
router.put('/api/:id', productoCtrl.actualizarProducto);
router.delete('/api/:id', productoCtrl.eliminarProducto);

module.exports = router;
