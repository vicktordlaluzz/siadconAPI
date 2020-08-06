const { response } = require('express');
const Usuario = require('../models/usuario/usuario');
const bcrypt = require('bcryptjs');
// const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res = response) => {
    try {
        const usuarios = await Usuario.find().populate('Role', 'nombre');

        res.json({
            ok: true,
            usuarios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        })
    }

};

const createUsuario = async(req, res = response) => {
    try {
        const pass = req.body.pass;
        // Creacion del usuario
        const usuario = new Usuario(req.body);

        // Encriptacion de la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.pass = bcrypt.hashSync(pass, salt);

        // Guardar usuario
        const usuarioDB = await usuario.save();

        // Respondemos con el usuario guardado
        res.json({
            ok: true,
            usuarioDB
        });

    } catch (error) {
        // Control del codigo de error
        if (error.code === 11000) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya se encuentra registrado'
            });
        }
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, por favor contacte con el administrador'
        });
    }
};

const updateUsuario = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'SIADCON-updateUsuario'
    });
};

const deleteUsuario = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'SIADCON-deleteUsuario'
    });
};

module.exports = {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
}