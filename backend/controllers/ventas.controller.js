import { Venta } from '../models/venta.model.js';
import { Product } from '../models/product.model.js';
import mongoose from 'mongoose';
// import { sendLowStockNotification } from '../utils/mailer.js'; // Descomentar si usas notificaciones de stock

// OBTENER TODAS LAS VENTAS
const getVentas = async (req, res) => {
    try {
        const ventas = await Venta.find({}).populate('lineItems.productId');
        res.status(200).json(ventas);
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        res.status(500).json({ message: error.message });
    }
};

// OBTENER UNA VENTA POR ID
const getVentaById = async (req, res) => {
    try {
        const { id } = req.params;
        const venta = await Venta.findById(id).populate('lineItems.productId');

        if (!venta) {
            return res.status(404).json({ message: "No se encontró ninguna venta con el ID proporcionado." });
        }
        res.status(200).json(venta);
    } catch (error) {
        console.error('Error al obtener venta por ID:', error);
        res.status(500).json({ message: error.message });
    }
};

// CREA UNA VENTA Y DEDUCE EL STOCK DE LOS PRODUCTOS
const createVenta = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name_client, dni_client, paymentMethod, lineItems } = req.body;

        if (!lineItems || lineItems.length === 0) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "La venta debe contener al menos un producto." });
        }

        const processedLineItems = [];

        for (const item of lineItems) {
            const product = await Product.findById(item.productId).session(session);

            if (!product) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ message: `Producto no encontrado con ID: ${item.productId}` });
            }

            if (product.stock < item.quantity) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ message: `Stock insuficiente para el producto: ${product.name}. Stock disponible: ${product.stock}, solicitado: ${item.quantity}` });
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                item.productId,
                { $inc: { stock: -item.quantity } },
                { new: true, session: session }
            );

            if (!updatedProduct || updatedProduct.stock < 0) {
                 await session.abortTransaction();
                 session.endSession();
                 return res.status(500).json({ message: `Error inesperado al deducir stock para ${product.name}. Operación abortada.` });
            }

            const itemPrice = item.priceAtSale !== undefined ? item.priceAtSale : product.price;

            processedLineItems.push({
                productId: product._id,
                productName: product.name,
                sku: product.sku,
                presentation: product.presentation,
                quantity: item.quantity,
                priceAtSale: itemPrice,
                subtotal: item.quantity * itemPrice
            });

            // Opcional: Alerta de stock bajo
            // if (sendLowStockNotification && updatedProduct.stock <= updatedProduct.min_stock) {
            //     sendLowStockNotification({
            //         type: 'low_stock',
            //         message: `¡Alerta de stock bajo para ${updatedProduct.name}! Stock actual: ${updatedProduct.stock}, Mínimo: ${updatedProduct.min_stock}`,
            //         productName: updatedProduct.name,
            //         currentStock: updatedProduct.stock,
            //         minStockThreshold: updatedProduct.min_stock,
            //         sku: updatedProduct.sku
            //     }).catch(err => console.error("Error al enviar alerta de stock bajo:", err));
            // }
        }

        const totalSaleAmount = processedLineItems.reduce((sum, item) => sum + item.subtotal, 0);

        const newVenta = new Venta({
            name_client,
            dni_client,
            paymentMethod,
            lineItems: processedLineItems,
            totalAmount: totalSaleAmount
        });

        const savedVenta = await newVenta.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: "Venta creada exitosamente y stock actualizado.",
            venta: savedVenta
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Error al crear la venta:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: "Error de validación: " + errors.join(', ') });
        }
        res.status(500).json({ message: "Error interno del servidor al procesar la venta." });
    }
};

export {
    getVentas,
    getVentaById,
    createVenta
};