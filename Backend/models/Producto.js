const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  proveedor: { type: String },
  costo_unitario: { type: Number, default: 0 },
  unidad_venta: { type: String },
  categoria: { type: String },
  precio_venta: { type: Number, default: 0 },
  stock_actual: { type: Number, default: 0 },
  stock_minimo: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Producto", productoSchema);



