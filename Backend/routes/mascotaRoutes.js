const express = require("express");
const router = express.Router();
const mascotaController = require("../controllers/mascotaController");

router.get("/", mascotaController.listarMascotas);
router.get("/nueva", mascotaController.formNuevaMascota);
router.post("/nueva", mascotaController.crearMascota);
router.get("/editar/:id", mascotaController.formEditarMascota);
router.post("/editar/:id", mascotaController.editarMascota);
router.get("/eliminar/:id", mascotaController.eliminarMascota);

module.exports = router;
