const Producto = require('../models/Producto');

// POST /api/products  → Crear nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    const { nombre, precio, stock, categoria, descripcion } = req.body;

    // Validación mínima (ya pusimos required en el schema, pero agregamos un ejemplo extra)
    if (!nombre || precio == null || stock == null || !categoria) {
      return res.status(400).json({ mensaje: 'Campos obligatorios faltantes' });
    }

    const nuevoProducto = new Producto({
      nombre,
      precio,
      stock,
      categoria,
      descripcion
    });

    await nuevoProducto.save();

    res.status(201).json({ mensaje: 'Producto creado correctamente', producto: nuevoProducto });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};