const express = require('express');
const router = express.Router();
const cajaController = require('../controllers/cajaController');
const { auth } = require('../middlewares/auth');

// Registrar ingreso o egreso
router.post('/', auth(['admin', 'vendedor']), cajaController.registrarMovimiento);

// Ver saldo actual
router.get('/saldo', auth(['admin', 'vendedor']), cajaController.obtenerSaldo);

module.exports = router;