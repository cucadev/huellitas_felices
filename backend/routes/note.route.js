import express from 'express';
import {
    getNotes,
    getNoteByDni,
    createNote,
    updateNote,
    deleteNote
} from '../controllers/notes.controller.js';

// CREA UN PBJETO ROUTER PARA MODULARIZAR Y AGRUPAR RUTAS
const router = express.Router();

// RUTAS PARA LAS NOTAS
router.get('/', getNotes); // OBTENER TODAS LAS NOTAS
router.get('/busqueda/:dni_client', getNoteByDni); // OBTENER NOTA POR DNI
router.post('/', createNote); // CREAR UNA NUEVA NOTA
router.put('/:id', updateNote); // ACTUALIZAR UNA NOTA POR ID
router.delete('/:id', deleteNote); // ELIMINAR UNA NOTA POR ID

export default router;