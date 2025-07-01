const express          = require('express');
const router           = express.Router();
const productoCtrl     = require('../controllers/productoController');


router.post('/', productoCtrl.crearProducto);
router.get('/', productoCtrl.obtenerProductos);

module.exports = router;