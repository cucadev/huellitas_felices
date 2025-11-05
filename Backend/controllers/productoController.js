const Producto = require("../models/Producto");

exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render("productos/dashboard", { productos });
  } catch (error) {
    res.send(error.message);
  }
};

exports.formNuevoProducto = (req, res) => {
  res.render("productos/nuevo");
};

exports.createProducto = async (req, res) => {
  try {
    await Producto.create(req.body);
    res.redirect("/productos/dashboard");
  } catch (err) {
    res.send(err.message);
  }
};

exports.formEditarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    res.render("productos/editar", { producto });
  } catch (err) {
    res.send(err.message);
  }
};

exports.updateProducto = async (req, res) => {
  try {
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/productos/dashboard");
  } catch (err) {
    res.send(err.message);
  }
};

exports.deleteProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.redirect("/productos/dashboard");
  } catch (err) {
    res.send(err.message);
  }
};
