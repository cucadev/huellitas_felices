import { Product } from '../models/product.model.js';

// OBTIENE TODOS LOS PRODUCTOS
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// OBTIENE UN PRODUCTO POR SKU
const getProductBySku = async (req, res) => {
    try {
        const skuToSearch = req.params.sku; // El parámetro en la URL será 'sku'
        const product = await Product.findOne({ sku: skuToSearch });

        if (!product) {
            return res.status(404).json({ message: "No se encontró ningún producto con el SKU proporcionado." });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// OBTIENE UN PRODUCTO POR NOMBRE
const getProductByName = async (req, res) => {
    try {
        const nameToSearch = req.params.name; // El parámetro en la URL será 'name'
        const product = await Product.findOne({ name: nameToSearch });

        if (!product) {
            return res.status(404).json({ message: "No se encontró ningún producto con el nombre proporcionado." });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// OBTIENE PRODUCTOS CON STOCK BAJO (basado en min_stock)
// const getLowStockProducts = async (req, res) => {
//     try {
//         const lowStockProducts = await Product.find({
//             $where: 'this.stock <= this.min_stock' // Busca donde el stock actual es menor o igual al stock mínimo
//         });

//         if (lowStockProducts.length === 0) {
//             return res.status(200).json({ message: "Todos los productos tienen stock suficiente." });
//         }
//         res.status(200).json(lowStockProducts);
//     } catch (error) {
//         console.error('Error al obtener productos con stock bajo:', error);
//         res.status(500).json({ message: error.message });
//     }
// };

// CREA UN PRODUCTO NUEVO
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        // MANEJO DE ERROR ESPECIFICO (ej. SKU duplicado)
        if (error.code === 11000) { // ERROR DE DUPLICIDAD (unique: true)
            return res.status(400).json({ message: "Ya existe un producto con el mismo nombre o SKU." });
        }
        res.status(500).json({ message: error.message });
    }
};

// ACTUALIZA UN PRODUCTO EXISTENTE
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // El ID del producto a actualizar
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!product) {
            return res.status(404).json({ message: "No se encontró ningún producto con el ID proporcionado para actualizar." });
        }
        // VARIABLE PARA ALMACENAR LA ALERTA SI ES NECESARIO
        let stockAlert = null;
        if (product.stock <= product.min_stock) {
            stockAlert = {
                type: 'low_stock',
                message: `¡Alerta de stock bajo para ${product.name}! Stock actual: ${product.stock}, Mínimo: ${product.min_stock}`,
                productName: product.name,
                currentStock: product.stock,
                minStockThreshold: product.min_stock,
                sku: product.sku // PARA IDENTIFICAR EL PRODUCTO EN ALERTA
            };
            // Aquí llamarías a la función para disparar una notificación real
            // Por ejemplo: sendLowStockNotification(stockAlert);
        }

        // DEVOLVEMOS EL PRODUCTO ACTUALIZADO Y LA ALERTA (si existe) EN LA MISMA RESPUESTA JSON
        res.status(200).json({
            message: "Producto actualizado correctamente.",
            product: product,
            alert: stockAlert // ESTE CAMPO SERA NULL SI NO HYA ALERTA
        });

    } catch (error) {
        // MANEJO DE ERRORES DE VALIDACION (ej. min_stock negativo)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        // MANEJO DE ERRORES ESPECIFICOS (ej. SKU duplicado si se intenta cambiar)
        if (error.code === 11000) {
            return res.status(400).json({ message: "El SKU o nombre proporcionado ya está en uso por otro producto." });
        }
        res.status(500).json({ message: error.message });
    }
};

// ELIMINA UN PRODUCTO
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // El ID del producto a eliminar
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "No se encontró ningún producto con el ID proporcionado para eliminar." });
        }

        res.status(200).json({ message: "Producto eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// EXPORTA LAS FUNCIONES PARA QUE PUEDAN SER UTILIZADAS EN LAS RUTAS
export {
    getProducts,
    getProductBySku,
    //getLowStockProducts,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct
};