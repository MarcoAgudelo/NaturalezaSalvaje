const bcrypt = require("bcrypt");
const authModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(process.env.CLIENTE_ID);


const crearUsuario = async (req, res) => {
    try{
        const {nombres, apellidos, email, password, telefono} = req.body;

        if (!nombres || !apellidos || !email || !password || !telefono) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios",
            });
        }

        const nombresLimpios = nombres.trim();
        const apellidosLimpios = apellidos.trim();
        const emailNormalizado = email.trim().toLowerCase();
        const passwordLimpia = password.trim();
        const telefonoLimpio = telefono.trim();

        if (!nombresLimpios || !apellidosLimpios || !emailNormalizado || !passwordLimpia || !telefonoLimpio) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios",
            });
        }

        const existeEmail = await authModel.obtenerUsuarioPorEmail(emailNormalizado);

        if (existeEmail) {
            return res.status(409).json({
                message: "El email ya esta registrado",
            });
        }

        const hashedPassword = await bcrypt.hash(passwordLimpia, 10);

        const nuevoUsuario = await authModel.crearUsuario({
            nombres: nombresLimpios,
            apellidos: apellidosLimpios,
            email: emailNormalizado,
            password: hashedPassword,
            telefono: telefonoLimpio
        });

        return res.status(201).json({
            message: "Usuario registrado correctamente",
            user: nuevoUsuario,
        });
    }catch(error){
        console.error("Error al crear usuario");
        return res.status(500).json({
            message: "Error interno del servidos",
        });
    }
   
};

const loginUsuario = async (req, res) => {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios",
            });
        }

        const emailNormalizado = email.trim().toLowerCase();
        const passwordLimpia = password.trim();

        if (!emailNormalizado || !passwordLimpia) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios",
            });
        }

        const existeUsuario = await authModel.obtenerUsuarioPorEmail(emailNormalizado);

        if (!existeUsuario) {
            return res.status(401).json({
                message: "Usuario no encontrado",
            });
        }

        const passwordValida = await bcrypt.compare(passwordLimpia, existeUsuario.password);

        if (!passwordValida) {
            return res.status(401).json({
                message: "Usuario no encontrado",
            });
        }

        const token = jwt.sign(
            {
                id: existeUsuario.id,
                email: existeUsuario.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        return res.status(200).json({
            message: "Login exitoso",
            token,
            user: {
                id: existeUsuario.id,
                nombres: existeUsuario.nombres,
                apellidos: existeUsuario.apellidos,
                email: existeUsuario.email,
                rol: existeUsuario.rol
            },
        });

    }catch(error){
        console.error("Error al iniciar sesion", error.message);
        return res.status(500).json({
            message: "Error internio del servidor",
        });
    }
};

const loginGoogle = async (req, res) => {
    try{
        const {credential} = req.body;

        if (!credential) {
            return res.status(400).json({
                message: "El token de Google es obligatorio",
            });
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.CLIENTE_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(401).json({
                message: "No se puede validar el usuario de Google",
            });
        }

        const googleId = payload.sub;
        const email = payload.email?.trim().toLowerCase();
        const emailVerificado = payload.email_verified;
        const nombres = payload.given_name?.trim() || "Usuario";
        const apellidos = payload.family_name?.trim() || "";

        if (!googleId || !email || !emailVerificado) {
            return res.status(401).json({
                message: "La cuenta de Google no es valida",
            });
        }

        let usuario = await authModel.obtenerUsuarioPorGoogleId(googleId);

        if (!usuario) {
            const usuarioPorEmail = await authModel.obtenerUsuarioPorEmail(email);

            if (usuarioPorEmail) {
                return res.status(409).json({
                    message: "Ya existe una cuenta con este correo. Inicia sesion con email y contraseña",
                });
            }

            usuario = await authModel.crearUsuariosPorGoogleId({
                nombres,
                apellidos,
                email,
                google_id: googleId,
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        return res.status(200).json({
            message: "Login con google exitoso",
            token,
            user: {
                id: usuario.id,
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                email: usuario.email,
            },
        });
    }
    catch(error) {
        console.error("Error en login con Google", error.message);
        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

module.exports = {
    crearUsuario,
    loginUsuario,
    loginGoogle
};