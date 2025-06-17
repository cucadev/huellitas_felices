const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: String,
  direccion: String,
  fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cliente', clienteSchema);