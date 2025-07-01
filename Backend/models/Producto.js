const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
  {
    nombre:     { type: String, required: true, trim: true },
    precio:     { type: Number, required: true, min: 0 },
    stock:      { type: Number, required: true, min: 0 },
    categoria:  { type: String, required: true, trim: true },
    descripcion:{ type: String, trim: true }
    // imagen: String  // ← lo dejamos para más adelante, si querés subir fotos
  },
  { timestamps: true }
);

module.exports = mongoose.model('Producto', productoSchema);