import { Note } from '../models/notes.model.js';

// OBTIENE TODAS LAS NOTAS
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({});
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// OBTIENE UNA NOTA POR DNI
const getNoteByDni = async (req, res) => {
    try {
        const dniToSearch = req.params.dni_client;
        const note = await Note.findOne({ dni_client: dniToSearch });

        if (!note) {
            return res.status(404).json({ message: "NO se encontró ninguna nota para el DNI proporcionado." });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREA UNA NOTA NUEVA
const createNote = async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(200).json(note);
    } catch (error) { // Aquí corregimos el 'catch' sin 'error'
        res.status(500).json({ message: error.message });
    }
};

// ACTUALIZA UNA NOTA EXISTENTE
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!note) {
            return res.status(404).json({ message: "NO se encontró ninguna nota con el ID proporcionado para actualizar." });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ELIMINA UNA NOTA
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);

        if (!note) {
            return res.status(404).json({ message: "NO se encontró ninguna nota con el ID proporcionado para eliminar." });
        }

        res.status(200).json({ message: "Nota eliminada correctamente." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// EXPORTO LAS FUNCIONES PARA QUE PUEDAN SER UTILIZADAS
export {
    getNotes,
    getNoteByDni,
    createNote,
    updateNote,
    deleteNote
};