import express from 'express';
import {
    getMascotas,
    getMascotasByDni,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota
} from '../controllers/mascotas.controller.js';

// CREA UN OBJETO ROUTER PARA MODULARIZAR Y AGRUPAR RUTAS
const router = express.Router();

// RUTAS PARA LAS MASCOTAS
router.get('/', getMascotas); // OBTENER TODAS LAS MASCOTAS
router.get('/cliente/:dni', getMascotasByDni); // OBTENER MASCOTAS POR DNI DEL CLIENTE
router.get('/:id', getMascotaById); // OBTENER MASCOTA POR ID
router.post('/', createMascota); // CREAR UNA NUEVA MASCOTA
router.put('/:id', updateMascota); // ACTUALIZAR UNA MASCOTA POR ID
router.delete('/:id', deleteMascota); // ELIMINAR UNA MASCOTA

export default router;