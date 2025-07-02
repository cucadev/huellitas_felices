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
// GET /api/products  → Listar todos los productos
exports.obtenerProductos = async (_req, res) => {
  try {
    const productos = await Producto.find(); // podés paginar después
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};
// GET /api/products/:id → Obtener un producto por su ID
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el producto', error: error.message });
  }
};
// PUT /api/products/:id → Actualizar un producto
exports.actualizarProducto = async (req, res) => {
  try {
    const datos = { ...req.body };

    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      datos,
      { new: true, runValidators: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto actualizado correctamente', producto: productoActualizado });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el producto', error: error.message });
  }
};