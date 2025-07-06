const express = require('express');
const router = express.Router();

const comprasController = require('../controllers/comprasController'); // controlador que creaste
const { auth } = require('../middlewares/auth'); // middleware para proteger rutas

// Ruta para registrar compra (solo roles 'admin' y 'vendedor')
router.post('/', auth(['admin', 'vendedor']), comprasController.registrarCompra);

module.exports = router;