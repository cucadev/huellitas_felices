const Caja = require('../models/Caja');

// Registrar movimiento (ingreso o egreso)
exports.registrarMovimiento = async (req, res) => {
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
};

// Consultar saldo actual
exports.obtenerSaldo = async (_req, res) => {
  try {
    const movimientos = await Caja.find();
    let saldo = 0;

    movimientos.forEach(m => {
      if (m.tipo === 'ingreso') saldo += m.monto;
      if (m.tipo === 'egreso') saldo -= m.monto;
    });

    res.json({ saldoActual: saldo, movimientos });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener saldo', error: error.message });
  }
};