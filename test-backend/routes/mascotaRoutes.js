import express from 'express';
const router = express.Router();
import * as mascotaCtrl from '../controllers/mascotaController.js';

// Dashboard de mascotas
router.get('/', mascotaCtrl.vistaMascotas);

// Crear nueva mascota
router.get('/nuevo', mascotaCtrl.formularioCrearMascota);
router.post('/nuevo', mascotaCtrl.crearMascota);

// Editar mascota
router.get('/editar/:id', mascotaCtrl.formularioEditarMascota);
router.post('/editar/:id', mascotaCtrl.actualizarMascota);

// Eliminar mascota
router.get('/eliminar/:id', mascotaCtrl.eliminarMascota);

export default router;