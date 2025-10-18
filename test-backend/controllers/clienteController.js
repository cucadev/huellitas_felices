import Cliente from '../models/Cliente.js';

// Mostrar listado de clientes en PUG
export const vistaClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.render('pages/clientes/clientes', { titulo: 'Listado de Clientes', clientes });
  } catch (error) {
    res.status(500).send('Error al cargar la vista: ' + error.message);
  }
};

// Formulario para crear nuevo cliente
export const formularioCrearCliente = (req, res) => {
  res.render('pages/clientes/nuevo', { titulo: 'Nuevo Cliente' });
};

// Guardar nuevo cliente
export const crearCliente = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion } = req.body;
    const nuevoCliente = new Cliente({ nombre, apellido, email, telefono, direccion });
    await nuevoCliente.save();
    res.redirect('http://localhost:4000/clientes');
  } catch (error) {
    res.status(400).send('Error al crear cliente: ' + error.message);
  }
};

// Formulario para editar cliente
export const formularioEditarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).send('Cliente no encontrado');
    res.render('pages/clientes/editar', { titulo: 'Editar Cliente', cliente });
  } catch (error) {
    res.status(500).send('Error al cargar cliente: ' + error.message);
  }
};

// Guardar edición de cliente
export const actualizarCliente = async (req, res) => {
  try {
    const datos = { ...req.body };
    const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, datos, { new: true, runValidators: true });
    if (!clienteActualizado) return res.status(404).send('Cliente no encontrado');
    res.redirect('http://localhost:4000/clientes');
  } catch (error) {
    res.status(400).send('Error al actualizar cliente: ' + error.message);
  }
};

// Eliminar cliente
export const eliminarCliente = async (req, res) => {
  try {
    const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
    if (!clienteEliminado) return res.status(404).send('Cliente no encontrado');
    res.redirect('http://localhost:4000/clientes');
  } catch (error) {
    res.status(500).send('Error al eliminar cliente: ' + error.message);
  }
};