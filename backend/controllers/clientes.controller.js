import { Cliente } from '../models/cliente.model.js';

// OBTIENE TODOS LOS CLIENTES
const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find({});
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// OBTIENE UN CLIENTE POR DNI
const getClienteByDni = async (req, res) => {
    try {
        const dniToSearch = req.params.dni;
        const cliente = await Cliente.findOne({ dni: dniToSearch });

        if (!cliente) {
            return res.status(404).json({ message: "NO se encontró ningún cliente para el DNI proporcionado." });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREA UN CLIENTE NUEVO
const createCliente = async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ACTUALIZA UN CLIENTE EXISTENTE
const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!cliente) {
            return res.status(404).json({ message: "NO se encontró ningún cliente con el ID proporcionado para actualizar." });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ELIMINA UN CLIENTE
const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findByIdAndDelete(id);

        if (!cliente) {
            return res.status(404).json({ message: "NO se encontró ningún cliente con el ID proporcionado para eliminar." });
        }

        res.status(200).json({ message: "Cliente eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// EXPORTO LAS FUNCIONES PARA QUE PUEDAN SER UTILIZADAS
export {
    getClientes,
    getClienteByDni,
    createCliente,
    updateCliente,
    deleteCliente
};