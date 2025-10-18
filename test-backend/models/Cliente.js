import { Schema, model } from 'mongoose';

const clienteSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: String,
  direccion: String,
}, { timestamps: true });

export default model('Cliente', clienteSchema);