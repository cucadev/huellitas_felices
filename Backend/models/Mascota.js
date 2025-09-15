const mongoose = require('mongoose');

const MascotaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  especie: { type: String, required: true }, // Perro, Gato, etc.
  raza: { type: String },
  edad: { type: Number },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true }, // Dueño
  observaciones: { type: String }
});

module.exports = mongoose.model('Mascota', MascotaSchema);