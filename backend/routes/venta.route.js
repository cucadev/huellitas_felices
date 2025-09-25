import express from 'express';
import {
    getVentas,
    getVentaById,
    createVenta
} from '../controllers/ventas.controller.js';

const router = express.Router();

// RUTAS PARA LAS VENTAS
router.get('/', getVentas);
router.get('/:id', getVentaById);
router.post('/', createVenta);

export default router;