const express = require('express');
const router = express.Router();
const cajaController = require('../controllers/cajaController');

// Vista dashboard de caja
router.get('/', async (req, res) => {
  try {
    const movimientos = await cajaController.obtenerMovimientos();
    let saldo = 0;

    movimientos.forEach(m => {
      if (m.tipo === 'ingreso') saldo += m.monto;
      if (m.tipo === 'egreso') saldo -= m.monto;
    });

    res.render('caja/dashboard', { 
      titulo: 'Caja', 
      movimientos, 
      saldo 
    });
  } catch (error) {
    res.status(500).send('Error al cargar la caja: ' + error.message);
  }
});

// Registrar ingreso o egreso (API)
router.post('/', cajaController.registrarMovimiento);

// Ver saldo actual (API)
router.get('/saldo', cajaController.obtenerSaldo);

router.post('/', cajaController.registrarMovimientoWeb);

module.exports = router;
