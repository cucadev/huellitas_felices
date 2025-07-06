const express          = require('express');
const router           = express.Router();
const productoCtrl     = require('../controllers/productoController');
const { auth } = require('../middlewares/auth');


router.post('/', auth(['admin']), productoCtrl.crearProducto); // Crear producto
router.get('/',    auth(), productoCtrl.obtenerProductos); // Ver todos
router.get('/:id', auth(), productoCtrl.obtenerProductoPorId); // Ver uno
router.put('/:id',  auth(['admin']), productoCtrl.actualizarProducto); // Actualizar producto
router.delete('/:id', auth(['admin']), productoCtrl.eliminarProducto); // Eliminar producto

module.exports = router;