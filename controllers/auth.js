const { response } = require('express');
const Usuario = require('../models/usuario/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const login = async(req, res = response) => {

    const { email, pass } = req.body;

    try {

        // Verificar si el email existe
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario o la contraseña no son validos'
            });
        }

        // validar contrasena
        const validarPass = bcrypt.compareSync(pass, usuarioDB.pass);
        if (!validarPass) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario o la contraseña no son validos'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuarioDB._id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }
};

module.exports = {
    login
};