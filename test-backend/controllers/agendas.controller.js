import { Agenda } from '../models/agenda.model.js';
// import { Cliente } from '../models/cliente.model.js'; PARA QUE FUNCIONE ESTE MODULO EN MI AGENDA HAY QUE DESCOMENTAR TODO EL MODULO CLIENTE QUE HIZO BRIAN

// OBTIENE CITAS EN UN RANGO DE FECHAS (PARA FULLCALENDAR)
const getAgendasByDate = async (req, res) => {
    try {
        const { start, end } = req.query;
        
        // Si no hay rango, devolver todas las citas
        let query = {};
        if (start && end) {
            query.date = {
                $gte: new Date(start),
                $lte: new Date(end)
            };
        }
        
        const agendas = await Agenda.find(query).sort({ date: 1, time: 1 });
        
        // FORMATEAR PARA FULLCALENDAR
        const events = agendas.map(agenda => {
            // Convertir fecha y hora a formato ISO para FullCalendar
            const dateStr = agenda.date.toISOString().split('T')[0];
            const startDateTime = `${dateStr}T${agenda.time}:00`;
            
            return {
                id: agenda._id.toString(),
                title: agenda.title,
                start: startDateTime,
                backgroundColor: agenda.backgroundColor,
                borderColor: agenda.borderColor,
                extendedProps: {
                    dni_client: agenda.dni_client,
                    name_client: agenda.name_client,
                    lastname_client: agenda.lastname_client,
                    email_client: agenda.email_client,
                    phone_client: agenda.phone_client,
                    address_client: agenda.address_client,
                    city_client: agenda.city_client,
                    pet_name: agenda.pet_name,
                    pet_type: agenda.pet_type,
                    professional: agenda.professional,
                    observations: agenda.observations,
                    status: agenda.status,
                    time: agenda.time,
                    date: dateStr
                }
            };
        });
        
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREA UNA CITA NUEVA
const createAgenda = async (req, res) => {
    try {
        const { dni_client, date, time, professional, ...otherData } = req.body;

        // VALIDACION DE DISPONIBILIDAD DEL VETERINARIO PARA NO TENER PROBLEMAS
        const citaExistente = await Agenda.findOne({
            date: new Date(date),
            time: time,
            professional: professional,
            // Un veterinario no puede tener dos citas con menos de 30 minutos de diferencia
            // $or: [
            //     { time: time }, // Misma hora
            //     {
            //         // Citas que empiezan 30 minutos antes o después
            //         time: {
            //             $gte: subtractMinutes(time, 30),
            //             $lte: addMinutes(time, 30)
            //         }
            //     }
            // ]
        });

        if (citaExistente) {
            return res.status(400).json({
                message: `El veterinario ${professional} ya tiene una cita agendada a las ${time} del ${date}.`
            });
        }

        // BUSCAR EL CLIENTE POR DNI PARA OBTENER SU ID
        const cliente = await Cliente.findOne({ dni: dni_client });
        
        if (!cliente) {
            return res.status(404).json({ message: "NO se encontró ningún cliente con el DNI proporcionado." });
        }

        // CREAR LA CITA CON LA REFERENCIA AL CLIENTE
        const agendaData = {
            ...otherData,
            date,
            time,
            professional,
            client: cliente._id,
            dni_client: dni_client,
            name_client: cliente.name,
            lastname_client: cliente.lastname,
            email_client: cliente.email,
            phone_client: cliente.phone,
            address_client: cliente.address,
            city_client: cliente.city
        };

        const agenda = await Agenda.create(agendaData);
        
        // DEVOLVER EN FORMATO FULLCALENDAR
        const dateStr = agenda.date.toISOString().split('T')[0];
        const startDateTime = `${dateStr}T${agenda.time}:00`;
        
        const eventFormatted = {
            id: agenda._id.toString(),
            title: agenda.title,
            start: startDateTime,
            backgroundColor: agenda.backgroundColor,
            borderColor: agenda.borderColor,
            extendedProps: {
                dni_client: agenda.dni_client,
                name_client: agenda.name_client,
                lastname_client: agenda.lastname_client,
                email_client: agenda.email_client,
                phone_client: agenda.phone_client,
                address_client: agenda.address_client,
                city_client: agenda.city_client,
                pet_name: agenda.pet_name,
                pet_type: agenda.pet_type,
                professional: agenda.professional,
                observations: agenda.observations,
                status: agenda.status,
                time: agenda.time,
                date: dateStr
            }
        };
        
        res.status(201).json(eventFormatted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ACTUALIZA UNA CITA EXISTENTE
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

// ELIMINA UNA CITA
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

export {
    getAgendasByDate,
    createAgenda,
    updateAgenda,
    deleteAgenda
};