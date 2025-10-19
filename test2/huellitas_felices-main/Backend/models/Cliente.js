const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  //AGREGUE DNI EN CLIENTE PARA QUE AL CREAR CITA EN AGENDA BUSQUE POR CLIENTE Y SE LLAMEN A LOS DATOS DINAMICAMENTE EN LA AGENDAA
  dni: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 20
  },

  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: String,
  direccion: String,
});

module.exports = mongoose.model('Cliente', clienteSchema);