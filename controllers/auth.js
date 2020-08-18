const { response } = require('express');
const Usuario = require('../models/usuario/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const login = async(req, res = response) => {

    const { email, pass } = req.body;

    try {

        // Verificar si el email existe
        const usuario = (await Usuario.findOne({ email, activo: true }));

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o la contraseña no son validos'
            });
        }

        // validar contrasena
        const validarPass = bcrypt.compareSync(pass, usuario.pass);
        if (!validarPass) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o la contraseña no son validos'
            });
        }

        // Generar el JWT
        let usr = (await Usuario.findOne({ email, activo: true }).populate('role', 'nombre descripcion')).toObject();
        delete usr.pass;
        delete usr.activo;
        const token = await generarJWT(usr._id, usr);
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