import { Schema, model } from 'mongoose';

const ventaSchema = new Schema(
  {
    // INFORMACION DEL CLIENTE (Opcional, si tienes un módulo de Clientes)
    // customer: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Customer', // Si tienes un modelo de Cliente
    //   required: false // Puede haber ventas anónimas
    // },

    name_client: {
      type: String,
      trim: true,
      maxlength: 100,
      default: 'Consumidor Final'
    },
    dni_client: {
      type: String,
      trim: true,
      maxlength: 20,
      sparse: true // PERMITE QUE VARIOS DOCUMENTOS NO TENGAN DNI O QUE SEA UNICO SI EXISTE
    },

    // DETALLE DE LOS PRODUCTOS VENDIDOS (Items de Línea)
    // ES UN ARRAY DE OBJETOS DONDE CADA OBJETO REPRESENTA UN PRODUCTO VENDIDO
    lineItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product', // REFERENCIA AL MODELO DEL PRODUCTO
          required: true
        },
        productName: { // DUPLICAR AQUI PARA EVITAR JOINS COSTOSOS
          type: String,
          required: true
        },
        sku: { // DUPLICAR SKU TAMBIEN
          type: String,
          required: true
        },
        presentation: { // DUPLICAR PRESENTACION TAMBIEN
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1 // LA CANTIDAD VENDIDA DEBE SER AL MENOS 1
        },
        priceAtSale: { // PRECIO AL MOMENTO DE LA VENTA (importante si los precios cambian)
          type: Number,
          required: true,
          min: 0
        },
        // Opcional: costo del producto al momento de la venta para calcular margen
        // costAtSale: {
        //     type: Number,
        //     min: 0
        // },
        subtotal: { // SUBTOTAL DE ESTE ITEM EN LINEA (quantity * priceAtSale)
          type: Number,
          required: true,
          min: 0
        }
      }
    ],

    // TOTAL DE LA VENTA
    totalAmount: {
      type: Number,
      required: true,
      min: 0 // EL TOTAL NO PUEDE SER NEGATIVO
    },

    // METODO DE PAGO
    paymentMethod: {
      type: String,
      required: true,
      enum: ['Efectivo', 'Tarjeta de Crédito', 'Tarjeta de Débito', 'Transferencia', 'Otros'],
      default: 'Efectivo'
    },

    // ESTADO DE LA VENTA (Opcional, útil para devoluciones, cancelaciones)
    status: {
      type: String,
      enum: ['Completada', 'Pendiente', 'Cancelada', 'Devuelta'],
      default: 'Completada'
    },

    // Notas Adicionales sobre la venta
    // notes: {
    //   type: String,
    //   trim: true,
    //   maxlength: 500
    // },

    // Referencia al usuario/empleado que realizó la venta (si tienes un módulo de usuarios)
    // soldBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: false
    // }

  },
  {
    timestamps: true
  }
);

//MIDDLEWARE
ventaSchema.pre('save', function(next) {
  let total = 0;
  this.lineItems.forEach(item => {
    item.subtotal = item.quantity * item.priceAtSale;
    total += item.subtotal;
  });
  this.totalAmount = total;
  next();
});

export const Venta = model('Venta', ventaSchema);