import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    // NOMBRE DEL PRODUCTO
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      unique: true, // Asegura que no haya productos con el mismo nombre
    },

    // DESCRIPCION DEL PRODUCTO
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    // PRESENTACION / PESO / VOLUMEN DEL PRODUCTO
    presentation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50, // EJEMPLOS: "15 kg", "2.5 Litros", "Pack x6", "Unidad"
    },

    // CODIGO DE BARRAS O SKU (Stock Keeping Unit)
    sku: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Cada SKU debe ser único
      maxlength: 50,
      index: true, // PARA BUSQUEDAS RAPIDAS POR SKU
    },

    // PRECIO DE VENTA DEL PRODUCTO
    price: {
      type: Number,
      required: true,
      min: 0, // EL PRECIO NO PUEDE SER NEGATIVO
    },

    // COSTO DE ADQUISICION DE PRODUCTO (opcional, pero útil para contabilidad)
    cost: {
      type: Number,
      min: 0,
    },

    // CANTIDAD DE STOCK DISPONIBLE
    stock: {
      type: Number,
      required: true,
      min: 0, // EL STOCK NO PUEDE SER NEGATIVO
      default: 0, // POR DEFECTO, EL STOCK ES 0 AL CREAR EL PRODUCTO
    },

    // UMBRAL DE STOCK MÍNIMO
    min_stock: {
      type: Number,
      required: true,
      min: 0,
      default: 5, // VALOR POR DEFECTO
    },

    // CATEGORIA DEL PRODUCTO (ej: Electrónica, Ropa, Alimentos)
    category: {
      type: String,
      trim: true,
      maxlength: 80,
      index: true, // PARA BUSQUEDAS POR CATEGORIAS
    },

    // URL DE LA IMAGEN DEL PRODUCTO (opcional)
    // imageUrl: {
    //   type: String,
    //   trim: true,
    // },

    // INDICA SI EL PRODUCTO ESTA ACTIVO O DESCONTINUADO
    // isActive: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  {
    // ACTIVA 'createdAt' Y 'updatedAt' AUTOMATICOS - AL CREAR LA NOTA SE PONE LA FECHA Y LA HORA EN QUE SE CREO Y SI SE ACTUALIZA LA NOTA, SE ACTUALIZA TAMBIEN LA FECHA Y LA HORA
    timestamps: true,
  }
);

export const Product = model('Product', productSchema);