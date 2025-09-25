import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    // TITULO DE LA NOTA
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    // DESCRICPCION
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // PROFESIONAL QUE ATIENDE (VETERINARIO TAL ... )
    professional: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    // NOMBRE DEL DUEÑO DE LA MASCOTA
    name_client: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    // APELLIDO DEL DUEÑO DE LA MASCOTA
    lastname_client: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    // DNI DEL DUEÑO DE LA MASCOTA
    dni_client: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
      index: true // ES BUENO INDEXAR LOS CAMPOS POR LOS QUE VAMOS A BUSCAR YA QUE AGILIZA LA BUSQUEDA EN LA BASE DE DATOS
    },

    // NOMBRE DE LA MASCOTA
    pet: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
  },
  {
    // ACTIVA 'createdAt' Y 'updatedAt' AUTOMATICOS - AL CREAR LA NOTA SE PONE LA FECHA Y LA HORA EN QUE SE CREO Y SI SE ACTUALIZA LA NOTA, SE ACTUALIZA TAMBIEN LA FECHA Y LA HORA
    timestamps: true,
  }
);

export const Note = model('Note', noteSchema);