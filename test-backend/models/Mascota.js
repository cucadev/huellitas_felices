import { Schema, model } from 'mongoose';

const mascotaSchema = new Schema({
  nombre: { type: String, required: true },
  especie: { type: String, required: true },
  raza: { type: String },
  edad: { type: Number },
  cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
  observaciones: { type: String }
}, { timestamps: true });

export default model('Mascota', mascotaSchema);