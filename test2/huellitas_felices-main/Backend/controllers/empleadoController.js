const Empleado = require('../models/Empleado');
const Servicio = require('../models/Servicio'); // ← IMPORTAR MODELO SERVICIOS

// VISTA PRINCIPAL DE EMPLEADOS (RENDERIZA PUG)
exports.vistaEmpleados = async (req, res) => {
  try {
    // CARGAR EMPLEADOS CON SUS SERVICIOS
    const empleados = await Empleado.find({}).populate('servicios');
    // CARGAR TODOS LOS SERVICIOS DISPONIBLES PARA LOS FORMULARIOS
    const servicios = await Servicio.find({});
    
    res.render('empleados/empleados', {
      titulo: 'Gestión de Empleados',
      empleados,
      servicios // ← PASAR SERVICIOS A LA VISTA PARA FORMULARIOS
    });
  } catch (error) {
    res.status(500).send('Error al cargar los empleados: ' + error.message);
  }
};

// CREAR EMPLEADO (REDIRIGE A /EMPLEADOS)
exports.crearEmpleado = async (req, res) => {
  try {
    const { dni, name, lastname, phone, role, servicios } = req.body;
    // CONVERTIR servicios A ARRAY SI VIENE COMO STRING O ARRAY
    const serviciosArray = Array.isArray(servicios) ? servicios : 
                          servicios ? [servicios] : [];
    
    const nuevoEmpleado = new Empleado({ 
      dni, 
      name, 
      lastname, 
      phone, 
      role, 
      servicios: serviciosArray 
    });
    await nuevoEmpleado.save();
    res.redirect('/empleados');
  } catch (error) {
    // ERROR DE DNI DUPLICADO
    if (error.code === 11000) {
      return res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #d32f2f;">❌ Error: DNI duplicado</h2>
            <p>No se puede registrar un empleado con un DNI que ya existe.</p>
            <p><strong>DNI duplicado:</strong> ${error.keyValue.dni}</p>
            <a href="/empleados" style="color: #762051;">← Volver a empleados</a>
          </body>
        </html>
      `);
    }
    res.status(400).send('Error al crear empleado: ' + error.message);
  }
};

// ACTUALIZAR EMPLEADO (REDIRIGE A /EMPLEADOS)
exports.actualizarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { dni, name, lastname, phone, role, servicios } = req.body;
    // CONVERTIR servicios A ARRAY
    const serviciosArray = Array.isArray(servicios) ? servicios : 
                          servicios ? [servicios] : [];
    
    const empleadoActualizado = await Empleado.findByIdAndUpdate(
      id, 
      { dni, name, lastname, phone, role, servicios: serviciosArray }, 
      { new: true, runValidators: true }
    );

    if (!empleadoActualizado) {
      return res.status(404).send('Empleado no encontrado');
    }
    res.redirect('/empleados');
  } catch (error) {
    // ERROR DE DNI DUPLICADO EN ACTUALIZACIÓN
    if (error.code === 11000) {
      return res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #d32f2f;">❌ Error: DNI duplicado</h2>
            <p>No se puede actualizar el empleado con un DNI que ya existe.</p>
            <p><strong>DNI duplicado:</strong> ${error.keyValue.dni}</p>
            <a href="/empleados" style="color: #762051;">← Volver a empleados</a>
          </body>
        </html>
      `);
    }
    res.status(400).send('Error al actualizar empleado: ' + error.message);
  }
};

// ELIMINAR EMPLEADO (REDIRIGE A /EMPLEADOS)
exports.eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const empleadoEliminado = await Empleado.findByIdAndDelete(id);

    if (!empleadoEliminado) {
      return res.status(404).send('Empleado no encontrado');
    }
    res.redirect('/empleados');
  } catch (error) {
    res.status(500).send('Error al eliminar empleado: ' + error.message);
  }
};

// ========================================
// FUNCIONES API PARA AGENDA
// ========================================

// OBTENER TODOS LOS EMPLEADOS (JSON)
exports.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find({}).populate('servicios');
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OBTENER EMPLEADO POR ID (JSON)
exports.getEmpleadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await Empleado.findById(id).populate('servicios');
    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OBTENER SOLO VETERINARIOS (PARA AGENDA)
exports.getVeterinarios = async (req, res) => {
  try {
    const veterinarios = await Empleado.find({ role: 'veterinario' })
      .select('name lastname role dni phone');
    
    res.status(200).json(veterinarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OBTENER SOLO PELUQUEROS (PARA AGENDA)
exports.getPeluqueros = async (req, res) => {
  try {
    const peluqueros = await Empleado.find({ role: 'peluquero' })
      .select('name lastname role dni phone');
    
    res.status(200).json(peluqueros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};