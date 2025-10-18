import { Schema, model } from 'mongoose';

const productoSchema = new Schema(
  {
    nombre:     { type: String, required: true, trim: true },
    precio:     { type: Number, required: true, min: 0 },
    stock:      { type: Number, required: true, min: 0 },
    categoria:  { type: String, required: true, trim: true },
    descripcion:{ type: String, trim: true }
    // imagen: String  //
  },
  { timestamps: true }
);

export default model('Producto', productoSchema);