import { Mascota } from '../models/mascota.model.js';

// OBTIENE TODAS LAS MASCOTAS
const getMascotas = async (req, res) => {
    try {
        const mascotas = await Mascota.find({});
        res.status(200).json(mascotas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// OBTIENE TODAS LAS MASCOTAS DE UN CLIENTE POR DNI
const getMascotasByDni = async (req, res) => {
    try {
        const dniToSearch = req.params.dni;
        const mascotas = await Mascota.find({ cliente_dni: dniToSearch, active: true });

        if (!mascotas || mascotas.length === 0) {
            return res.status(404).json({ message: "NO se encontraron mascotas para el DNI proporcionado." });
        }
        res.status(200).json(mascotas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// OBTIENE UNA MASCOTA POR ID
const getMascotaById = async (req, res) => {
    try {
        const { id } = req.params;
        const mascota = await Mascota.findById(id);

        if (!mascota) {
            return res.status(404).json({ message: "NO se encontró ninguna mascota con el ID proporcionado." });
        }
        res.status(200).json(mascota);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREA UNA MASCOTA NUEVA
const createMascota = async (req, res) => {
    try {
        const mascota = await Mascota.create(req.body);
        res.status(200).json(mascota);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ACTUALIZA UNA MASCOTA EXISTENTE
const updateMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const mascota = await Mascota.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!mascota) {
            return res.status(404).json({ message: "NO se encontró ninguna mascota con el ID proporcionado para actualizar." });
        }
        res.status(200).json(mascota);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ELIMINA UNA MASCOTA
const deleteMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const mascota = await Mascota.findByIdAndDelete(id);

        if (!mascota) {
            return res.status(404).json({ message: "NO se encontró ninguna mascota con el ID proporcionado para eliminar." });
        }

        res.status(200).json({ message: "Mascota eliminada correctamente." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// EXPORTO LAS FUNCIONES PARA QUE PUEDAN SER UTILIZADAS
export {
    getMascotas,
    getMascotasByDni,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota
};