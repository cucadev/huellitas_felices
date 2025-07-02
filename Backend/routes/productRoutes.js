const express          = require('express');
const router           = express.Router();
const productoCtrl     = require('../controllers/productoController');


router.post('/', productoCtrl.crearProducto);
router.get('/', productoCtrl.obtenerProductos);
router.get('/:id', productoCtrl.obtenerProductoPorId);
router.put('/:id', productoCtrl.actualizarProducto);
router.delete('/:id', productoCtrl.eliminarProducto);

module.exports = router;