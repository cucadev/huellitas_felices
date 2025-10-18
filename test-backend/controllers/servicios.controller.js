import { Servicio } from '../models/servicio.model.js';

// OBTIENE TODOS LOS SERVICIOS
const getServicios = async (req, res) => {
    try {
        const servicios = await Servicio.find({});
        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// OBTIENE UN SERVICIO POR ID
const getServicioById = async (req, res) => {
    try {
        const { id } = req.params;
        const servicio = await Servicio.findById(id);

        if (!servicio) {
            return res.status(404).json({ message: "NO se encontró ningún servicio con el ID proporcionado." });
        }
        res.status(200).json(servicio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREA UN SERVICIO NUEVO
const createServicio = async (req, res) => {
    try {
        const servicio = await Servicio.create(req.body);
        res.status(200).json(servicio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ACTUALIZA UN SERVICIO EXISTENTE
const updateServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const servicio = await Servicio.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!servicio) {
            return res.status(404).json({ message: "NO se encontró ningún servicio con el ID proporcionado para actualizar." });
        }
        res.status(200).json(servicio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ELIMINA UN SERVICIO
const deleteServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const servicio = await Servicio.findByIdAndDelete(id);

        if (!servicio) {
            return res.status(404).json({ message: "NO se encontró ningún servicio con el ID proporcionado para eliminar." });
        }

        res.status(200).json({ message: "Servicio eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// EXPORTO LAS FUNCIONES PARA QUE PUEDAN SER UTILIZADAS
export {
    getServicios,
    getServicioById,
    createServicio,
    updateServicio,
    deleteServicio
};
