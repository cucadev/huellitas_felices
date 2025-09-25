import { Schema, model } from 'mongoose';

const clienteSchema = new Schema(
  {
    // NOMBRE DEL CLIENTE
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    // APELLIDO DEL CLIENTE
    lastname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    // DNI DEL CLIENTE
    dni: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
      unique: true, // CADA CLIENTE DEBE TENER UN DNI ÚNICO
      index: true // ES BUENO INDEXAR LOS CAMPOS POR LOS QUE VAMOS A BUSCAR YA QUE AGILIZA LA BUSQUEDA EN LA BASE DE DATOS
    },

    // EMAIL DEL CLIENTE
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      lowercase: true, // GUARDA EL EMAIL EN MINÚSCULAS
    },

    // TELÉFONO DEL CLIENTE
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    // DIRECCIÓN DEL CLIENTE
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    // CIUDAD DEL CLIENTE
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    // ESTADO/ACTIVO DEL CLIENTE
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    // ACTIVA 'createdAt' Y 'updatedAt' AUTOMATICOS - AL CREAR EL CLIENTE SE PONE LA FECHA Y LA HORA EN QUE SE CREO Y SI SE ACTUALIZA EL CLIENTE, SE ACTUALIZA TAMBIEN LA FECHA Y LA HORA
    timestamps: true,
  }
);

export const Cliente = model('Cliente', clienteSchema);