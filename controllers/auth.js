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
        console.log(usr);
        delete usr.pass;
        delete usr.activo;
        const token = await generarJWT(usr._id);
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

const isLogged = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'El usuario esta loggeado correctamente'
    });
};

const changePass = async(req, res = response) => {
    const pass = req.body.pass;
    const usr = req.uid;
    try {
        const usuario = await Usuario.findById(usr);
        // validar contrasena
        const validarPass = bcrypt.compareSync(pass, usuario.pass);
        if (!validarPass) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña actual no es correcta'
            });
        }

        const salt = bcrypt.genSaltSync();
        const newPass = bcrypt.hashSync(req.body.newPass, salt);
        const newUsr = await Usuario.findByIdAndUpdate(usuario, { pass: newPass }, { new: true });
        if (newUsr) {
            res.json({
                ok: true,
                msg: 'La contraseña se ha actualizado'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        })
    }
};

module.exports = {
    login,
    isLogged,
    changePass
};