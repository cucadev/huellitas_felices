import { Empleado } from '../models/empleado.model.js';

// OBTIENE TODOS LOS EMPLEADOS
const getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.find({});
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// OBTIENE UN EMPLEADO POR DNI
const getEmpleadoByDni = async (req, res) => {
    try {
        const dniToSearch = req.params.dni;
        const empleado = await Empleado.findOne({ dni: dniToSearch });

        if (!empleado) {
            return res.status(404).json({ message: "NO se encontró ningún empleado para el DNI proporcionado." });
        }
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// OBTIENE UN EMPLEADO POR ID
const getEmpleadoById = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await Empleado.findById(id);

        if (!empleado) {
            return res.status(404).json({ message: "NO se encontró ningún empleado con el ID proporcionado." });
        }
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREA UN EMPLEADO NUEVO
const createEmpleado = async (req, res) => {
    try {
        const empleado = await Empleado.create(req.body);
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ACTUALIZA UN EMPLEADO EXISTENTE
const updateEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await Empleado.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!empleado) {
            return res.status(404).json({ message: "NO se encontró ningún empleado con el ID proporcionado para actualizar." });
        }
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ELIMINA UN EMPLEADO
const deleteEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await Empleado.findByIdAndDelete(id);

        if (!empleado) {
            return res.status(404).json({ message: "NO se encontró ningún empleado con el ID proporcionado para eliminar." });
        }

        res.status(200).json({ message: "Empleado eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// EXPORTO LAS FUNCIONES PARA QUE PUEDAN SER UTILIZADAS
export {
    getEmpleados,
    getEmpleadoByDni,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
};
