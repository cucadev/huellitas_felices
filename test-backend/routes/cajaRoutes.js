import { Router } from 'express';
const router = Router();
import { obtenerMovimientos, registrarMovimiento, obtenerSaldo, registrarMovimientoWeb } from '../controllers/cajaController.js';

// Vista dashboard de caja (GET)
router.get('/', async (req, res) => {
  try {
    const movimientos = await obtenerMovimientos();
    let saldo = 0;

    movimientos.forEach(m => {
      if (m.tipo === 'ingreso') saldo += m.monto;
      if (m.tipo === 'egreso') saldo -= m.monto;
    });

    res.render('pages/dashboard', { 
      titulo: 'Caja', 
      movimientos, 
      saldo 
    });
  } catch (error) {
    res.status(500).send('Error al cargar la caja: ' + error.message);
  }
});

// Registrar desde formulario web (POST) - USA registrarMovimientoWeb
router.post('/', registrarMovimientoWeb);  // ← ESTO ES CLAVE

// Ver saldo actual (API)
router.get('/saldo', obtenerSaldo);

// API para registrar movimiento (JSON)
router.post('/api', registrarMovimiento);

export default router;