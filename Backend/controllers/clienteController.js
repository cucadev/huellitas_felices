const Cliente = require('../models/Cliente');

// Mostrar listado de clientes en PUG
exports.vistaClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.render('clientes/clientes', { titulo: 'Listado de Clientes', clientes });
  } catch (error) {
    res.status(500).send('Error al cargar la vista: ' + error.message);
  }
};

// Formulario para crear nuevo cliente
exports.formularioCrearCliente = (req, res) => {
  res.render('clientes/nuevo', { titulo: 'Nuevo Cliente' });
};

// Guardar nuevo cliente
exports.crearCliente = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion } = req.body;
    const nuevoCliente = new Cliente({ nombre, apellido, email, telefono, direccion });
    await nuevoCliente.save();
    res.redirect('/clientes');
  } catch (error) {
    res.status(400).send('Error al crear cliente: ' + error.message);
  }
};

// Formulario para editar cliente
exports.formularioEditarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).send('Cliente no encontrado');
    res.render('clientes/editar', { titulo: 'Editar Cliente', cliente });
  } catch (error) {
    res.status(500).send('Error al cargar cliente: ' + error.message);
  }
};

// Guardar edición de cliente
exports.actualizarCliente = async (req, res) => {
  try {
    const datos = { ...req.body };
    const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, datos, { new: true, runValidators: true });
    if (!clienteActualizado) return res.status(404).send('Cliente no encontrado');
    res.redirect('/clientes');
  } catch (error) {
    res.status(400).send('Error al actualizar cliente: ' + error.message);
  }
};

// Eliminar cliente
exports.eliminarCliente = async (req, res) => {
  try {
    const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
    if (!clienteEliminado) return res.status(404).send('Cliente no encontrado');
    res.redirect('/clientes');
  } catch (error) {
    res.status(500).send('Error al eliminar cliente: ' + error.message);
  }
};
