const express          = require('express');
const router           = express.Router();
const productoCtrl     = require('../controllers/productoController');


router.post('/', productoCtrl.crearProducto);
router.get('/', productoCtrl.obtenerProductos);
router.get('/:id', productoCtrl.obtenerProductoPorId);

module.exports = router;