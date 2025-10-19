const Servicio = require('../models/Servicio');

// VISTA PRINCIPAL DE SERVICIOS (RENDERIZA PUG)
exports.vistaServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find({});
    res.render('servicios/servicios', {
      titulo: 'Servicios Veterinarios',
      servicios
    });
  } catch (error) {
    res.status(500).send('Error al cargar los servicios: ' + error.message);
  }
};

// CREAR SERVICIO (REDIRIGE A /SERVICIOS)
exports.crearServicio = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const nuevoServicio = new Servicio({ name, description, price });
    await nuevoServicio.save();
    res.redirect('/servicios');
  } catch (error) {
    res.status(400).send('Error al crear servicio: ' + error.message);
  }
};

// ACTUALIZAR SERVICIO (REDIRIGE A /SERVICIOS)
exports.actualizarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const servicioActualizado = await Servicio.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!servicioActualizado) {
      return res.status(404).send('Servicio no encontrado');
    }
    res.redirect('/servicios');
  } catch (error) {
    res.status(400).send('Error al actualizar servicio: ' + error.message);
  }
};

// ELIMINAR SERVICIO (REDIRIGE A /SERVICIOS)
exports.eliminarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const servicioEliminado = await Servicio.findByIdAndDelete(id);

    if (!servicioEliminado) {
      return res.status(404).send('Servicio no encontrado');
    }
    res.redirect('/servicios');
  } catch (error) {
    res.status(500).send('Error al eliminar servicio: ' + error.message);
  }
};