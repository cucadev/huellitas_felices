import express from 'express';
import {
    getProducts,
    getProductBySku,
    //getLowStockProducts,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/products.controller.js';

// CREA UN OBJETO ROUTER PARA MODULARIZAR Y AGRUPAR RUTAS
const router = express.Router();

// RUTAS PARA LOS PRODUCTOS
router.get('/', getProducts);// GET /api/products - Obtiene todos los productos
router.get('/busqueda/sku/:sku', getProductBySku);// GET /api/products/busqueda/sku/:sku - Obtiene un producto por su SKU
router.get('/busqueda/name/:name', getProductByName);// GET /api/products/busqueda/name/:name - Obtiene un producto por su nombre
// router.get('/busqueda/low-stock', getLowStockProducts);// GET /api/products/busqueda/low-stock - Obtiene productos con stock bajo
router.post('/', createProduct);// POST /api/products - Crea un nuevo producto
router.put('/:id', updateProduct);// PUT /api/products/:id - Actualiza un producto por su ID
router.delete('/:id', deleteProduct);// DELETE /api/products/:id - Elimina un producto por su ID

export default router;