import express from 'express';
import {
    getClientes,
    getClienteByDni,
    createCliente,
    updateCliente,
    deleteCliente
} from '../controllers/clientes.controller.js';

// CREA UN OBJETO ROUTER PARA MODULARIZAR Y AGRUPAR RUTAS
const router = express.Router();

// RUTAS PARA LOS CLIENTES
router.get('/', getClientes); // OBTENER TODOS LOS CLIENTES
router.get('/busqueda/:dni', getClienteByDni); // OBTENER CLIENTE POR DNI
router.post('/', createCliente); // CREAR UN NUEVO CLIENTE
router.put('/:id', updateCliente); // ACTUALIZAR UN CLIENTE POR ID
router.delete('/:id', deleteCliente); // ELIMINAR UN CLIENTE POR ID

export default router;