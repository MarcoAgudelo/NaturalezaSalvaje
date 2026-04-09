const bcrypt = require("bcrypt");
const authModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");

const crearUsuario = async (req, res) => {
    try{
        const {nombres, apellidos, email, password} = req.body;

        if (!nombres || !apellidos || !email || !password) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios",
            });
        }

        const nombresLimpios = nombres.trim();
        const apellidosLimpios = apellidos.trim();
        const emailNormalizado = email.trim().toLowerCase();
        const passwordLimpia = password.trim();

        if (!nombresLimpios || !apellidosLimpios || !emailNormalizado || !passwordLimpia) {
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

module.exports = {
    crearUsuario,
    loginUsuario
};