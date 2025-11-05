const Producto = require('../models/Producto');

// Mostrar listado
exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render('productos/dashboard', { productos });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener productos');
  }
};

// Form nuevo producto
exports.formNuevoProducto = (req, res) => {
  res.render('productos/nuevo');
};

// Crear producto
exports.createProducto = async (req, res) => {
  try {
    await Producto.create(req.body);
    res.redirect('/productos');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al crear producto');
  }
};

// Form editar producto
exports.formEditarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    res.render('productos/editar', { producto });
  } catch (error) {
    console.log(error);
    res.status(404).send('Producto no encontrado');
  }
};

// Actualizar producto
exports.updateProducto = async (req, res) => {
  try {
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/productos');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al actualizar producto');
  }
};

// Eliminar producto
exports.deleteProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.redirect('/productos');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al eliminar producto');
  }
};
