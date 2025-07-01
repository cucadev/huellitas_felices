const express          = require('express');
const router           = express.Router();
const productoCtrl     = require('../controllers/productoController');

// Por ahora solo el POST; luego añadimos el resto del CRUD
router.post('/', productoCtrl.crearProducto);

module.exports = router;