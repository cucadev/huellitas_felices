import { Schema, model } from 'mongoose';

const mascotaSchema = new Schema(
  {
    // DNI DEL CLIENTE DUEÑO DE LA MASCOTA (REFERENCIA A LA COLECCIÓN CLIENTES)
    cliente_dni: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
      index: true // ES BUENO INDEXAR LOS CAMPOS POR LOS QUE VAMOS A BUSCAR YA QUE AGILIZA LA BUSQUEDA EN LA BASE DE DATOS
    },

    // NOMBRE DE LA MASCOTA
    nombre: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    // ESPECIE DE LA MASCOTA (PERRO, GATO, AVE, ETC.)
    especie: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    // RAZA DE LA MASCOTA
    raza: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    // EDAD DE LA MASCOTA
    edad: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    // PESO DE LA MASCOTA
    peso: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    // COLOR DE LA MASCOTA
    color: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    // GÉNERO DE LA MASCOTA (MACHO, HEMBRA)
    genero: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    // ESTADO/ACTIVO DE LA MASCOTA
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    // ACTIVA 'createdAt' Y 'updatedAt' AUTOMATICOS - AL CREAR LA MASCOTA SE PONE LA FECHA Y LA HORA EN QUE SE CREO Y SI SE ACTUALIZA LA MASCOTA, SE ACTUALIZA TAMBIEN LA FECHA Y LA HORA
    timestamps: true,
  }
);

export const Mascota = model('Mascota', mascotaSchema);