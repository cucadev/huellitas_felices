import express from 'express';
import {
    getEmpleados,
    getEmpleadoByDni,
    getEmpleadoById,
    getEmpleadosByRol,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
} from '../controllers/empleados.controller.js';

// CREA UN OBJETO ROUTER PARA MODULARIZAR Y AGRUPAR RUTAS
const router = express.Router();

// RUTAS PARA LOS EMPLEADOS
router.get('/', getEmpleados);                 // OBTENER TODOS LOS EMPLEADOS
router.get('/busqueda/:dni', getEmpleadoByDni); // OBTENER EMPLEADO POR DNI
router.get('/:id', getEmpleadoById);          // OBTENER EMPLEADO POR ID
router.get('/rol/:rol', getEmpleadosByRol);   // OBTENER ROL DE EMPLEADO
router.post('/', createEmpleado);             // CREAR UN NUEVO EMPLEADO
router.put('/:id', updateEmpleado);           // ACTUALIZAR UN EMPLEADO POR ID
router.delete('/:id', deleteEmpleado);        // ELIMINAR UN EMPLEADO POR ID

export default router;
