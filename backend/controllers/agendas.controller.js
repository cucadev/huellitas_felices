import { Agenda } from '../models/agenda.model.js';
import { Cliente } from '../models/cliente.model.js';

// OBTIENE CITAS DE UN DÍA ESPECÍFICO (PARA FULLCALENDAR)
const getAgendasByDate = async (req, res) => {
    try {
        const { date } = req.query;
        
        const agendas = await Agenda.find({
            date: new Date(date)
        }).sort({ time: 1 });
        
        res.status(200).json(agendas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREA UNA CITA NUEVA (DESDE MODAL DE FULLCALENDAR)
const createAgenda = async (req, res) => {
    try {
        const { dni_client, ...otherData } = req.body;

        // BUSCAR EL CLIENTE POR DNI PARA OBTENER SU ID
        const cliente = await Cliente.findOne({ dni: dni_client });
        
        if (!cliente) {
            return res.status(404).json({ message: "NO se encontró ningún cliente con el DNI proporcionado." });
        }

        // CREAR LA CITA CON LA REFERENCIA AL CLIENTE
        const agendaData = {
            ...otherData,
            client: cliente._id, // REFERENCIA AL ID DEL CLIENTE
            dni_client: dni_client,
            // AUTOCOMPLETAR DATOS DEL CLIENTE
            name_client: cliente.name,
            lastname_client: cliente.lastname,
            email_client: cliente.email,
            phone_client: cliente.phone,
            address_client: cliente.address,
            city_client: cliente.city
        };

        const agenda = await Agenda.create(agendaData);
        res.status(200).json(agenda);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ACTUALIZA UNA CITA EXISTENTE (EDITAR/MOVER EN FULLCALENDAR)
const updateAgenda = async (req, res) => {
    try {
        const { id } = req.params;
        const { dni_client, ...otherData } = req.body;

        let updateData = { ...otherData };

        // SI SE ESTÁ CAMBIANDO EL DNI, BUSCAR EL NUEVO CLIENTE
        if (dni_client) {
            const cliente = await Cliente.findOne({ dni: dni_client });
            
            if (!cliente) {
                return res.status(404).json({ message: "NO se encontró ningún cliente con el DNI proporcionado." });
            }

            // ACTUALIZAR REFERENCIA Y DATOS DEL CLIENTE
            updateData = {
                ...updateData,
                client: cliente._id,
                dni_client: dni_client,
                name_client: cliente.name,
                lastname_client: cliente.lastname,
                email_client: cliente.email,
                phone_client: cliente.phone,
                address_client: cliente.address,
                city_client: cliente.city
            };
        }

        const agenda = await Agenda.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!agenda) {
            return res.status(404).json({ message: "NO se encontró ninguna cita con el ID proporcionado para actualizar." });
        }
        
        res.status(200).json(agenda);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ELIMINA UNA CITA (DESDE FULLCALENDAR)
const deleteAgenda = async (req, res) => {
    try {
        const { id } = req.params;
        const agenda = await Agenda.findByIdAndDelete(id);

        if (!agenda) {
            return res.status(404).json({ message: "NO se encontró ninguna cita con el ID proporcionado para eliminar." });
        }

        res.status(200).json({ message: "Cita eliminada correctamente." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// EXPORTO SOLO LAS FUNCIONES NECESARIAS PARA FULLCALENDAR
export {
    getAgendasByDate,       // CARGAR CITAS DEL DÍA EN EL CALENDARIO
    createAgenda,           // CREAR CITA DESDE MODAL
    updateAgenda,           // EDITAR/MOVER CITAS
    deleteAgenda            // ELIMINAR CITAS
};