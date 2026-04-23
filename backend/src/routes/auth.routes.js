const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { verificarToken } = require("../middlewares/auth.middleware");

router.post("/registro", authController.crearUsuario);
router.post("/login", authController.loginUsuario);
router.post("/google", authController.loginGoogle);
router.get("/me", verificarToken, authController.obtenerPerfil);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);


module.exports = router;