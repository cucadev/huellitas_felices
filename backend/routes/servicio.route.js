import express from 'express';
import {
    getServicios,
    getServicioById,
    createServicio,
    updateServicio,
    deleteServicio
} from '../controllers/servicios.controller.js';

// CREA UN OBJETO ROUTER PARA MODULARIZAR Y AGRUPAR RUTAS
const router = express.Router();

// RUTAS PARA LOS SERVICIOS
router.get('/', getServicios);           // OBTENER TODOS LOS SERVICIOS
router.get('/:id', getServicioById);     // OBTENER SERVICIO POR ID
router.post('/', createServicio);        // CREAR UN NUEVO SERVICIO
router.put('/:id', updateServicio);      // ACTUALIZAR UN SERVICIO POR ID
router.delete('/:id', deleteServicio);   // ELIMINAR UN SERVICIO POR ID

export default router;
