const Compra = require('../models/Compra');  // modelo Compra (Purchase)
const Producto = require('../models/Producto'); 

exports.registrarCompra = async (req, res) => {
  try {
    const { producto, cantidad, precioUnitario, proveedor } = req.body;

    // Verificar que el producto exista
    const productoExistente = await Producto.findById(producto);
    if (!productoExistente) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Crear la compra
    const compra = new Compra({
      producto,
      cantidad,
      precioUnitario,
      proveedor
    });
    await compra.save();

    // Actualizar stock sumando la cantidad comprada
    productoExistente.stock += cantidad;
    await productoExistente.save();

    res.status(201).json({ mensaje: 'Compra registrada y stock actualizado', compra });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar compra', error: error.message });
  }
};