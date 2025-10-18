import { Schema, model } from 'mongoose';

const movimientoSchema = new Schema({
  tipo: {
    type: String,
    enum: ['ingreso', 'egreso'],
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default model('Caja', movimientoSchema);