import Caja from '../models/Caja.js';

// Registrar movimiento (ingreso o egreso) - PARA API
export async function registrarMovimiento(req, res) {
  try {
    const { tipo, monto, descripcion } = req.body;

    if (!['ingreso', 'egreso'].includes(tipo)) {
      return res.status(400).json({ mensaje: 'Tipo inválido (ingreso o egreso)' });
    }

    const movimiento = new Caja({ tipo, monto, descripcion });
    await movimiento.save();

    res.status(201).json({ mensaje: 'Movimiento registrado', movimiento });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar movimiento', error: error.message });
  }
}

// Consultar saldo actual - PARA API
export async function obtenerSaldo(_req, res) {
  try {
    const movimientos = await Caja.find();  // ← CORREGIDO
    let saldo = 0;

    movimientos.forEach(m => {
      if (m.tipo === 'ingreso') saldo += m.monto;
      if (m.tipo === 'egreso') saldo -= m.monto;
    });

    res.json({ saldoActual: saldo, movimientos });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener saldo', error: error.message });
  }
}

// Registrar movimiento desde formulario web - REDIRIGE
export async function registrarMovimientoWeb(req, res) {
  try {
    const { tipo, monto, descripcion } = req.body;

    if (!['ingreso', 'egreso'].includes(tipo)) {
      return res.status(400).send('Tipo inválido (ingreso o egreso)');
    }

    const movimiento = new Caja({ tipo, monto, descripcion });
    await movimiento.save();

    // Redirigir al dashboard de caja
    res.redirect('http://localhost:4000/caja');
  } catch (error) {
    res.status(500).send('Error al registrar movimiento: ' + error.message);
  }
}

// Obtener movimientos para vista
export async function obtenerMovimientos() {
  return await Caja.find();  // ← CORREGIDO
}