import { Schema, model } from 'mongoose';

const servicioSchema = new Schema(
  {
    // NOMBRE DEL SERVICIO (ej: "Consulta clínica general")
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      unique: true,
    },

    // DESCRIPCIÓN DEL SERVICIO
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    // PRECIO DEL SERVICIO
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, // guarda createdAt y updatedAt
  }
);

export const Servicio = model('Servicio', servicioSchema);
