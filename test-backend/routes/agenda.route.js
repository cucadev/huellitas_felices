import express from 'express';
import {
    getAgendasByDate,
    createAgenda,
    updateAgenda,
    deleteAgenda
} from '../controllers/agendas.controller.js';

// CREA UN OBJETO ROUTER PARA MODULARIZAR Y AGRUPAR RUTAS
const router = express.Router();

// RUTAS PARA LA AGENDA
router.get('/', getAgendasByDate); // OBTENER CITAS POR FECHA
router.post('/', createAgenda); // CREAR UNA NUEVA CITA
router.put('/:id', updateAgenda); // ACTUALIZAR UNA CITA POR ID
router.delete('/:id', deleteAgenda); // ELIMINAR UNA CITA POR ID

export default router;