const Producto = require('../models/Producto');

// Crear nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    const { nombre, precio, stock, categoria, descripcion } = req.body;

    // Validación mínima 
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
// Listar todos los productos
exports.obtenerProductos = async (_req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};
// Obtener un producto por su ID
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
// Actualizar un producto
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
// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el producto', error: error.message });
  }
};

exports.vistaProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render('productos/dashboard', { titulo: 'Listado de Productos', productos });
  } catch (error) {
    res.status(500).send('Error al cargar la vista: ' + error.message);
  }
};

// Formulario para crear un producto
exports.formularioCrearProducto = (req, res) => {
  res.render('productos/nuevo', { titulo: 'Nuevo Producto' });
};

// Formulario para editar un producto
exports.formularioEditarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).send('Producto no encontrado');
    res.render('productos/editar', { titulo: 'Editar Producto', producto });
  } catch (error) {
    res.status(500).send('Error al cargar el producto: ' + error.message);
  }
};