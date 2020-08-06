const { response } = require('express');
const Usuario = require('../models/usuario/usuario');
const bcrypt = require('bcryptjs');
// const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res = response) => {
    try {
        const usuarios = await Usuario.find({ activo: true }, 'nombre email img').
        populate('role', 'nombre descripcion');

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
    const id = req.params.id;
    // const uid = req.uid;
    let pass = '';

    try {
        const usuarioDB = await Usuario.findById(id);

        // Verifica si existe el usuario
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el usuario solicitado'
            });
        }

        // Si se requiere actualizar la contraseña
        if (req.body.pass) {
            const salt = bcrypt.genSaltSync();
            pass = bcrypt.hashSync(pass, salt);
            await Usuario.findOneAndUpdate({ _id: id }, { pass: pass }, { new: true })
            return res.json({
                ok: true,
                msg: 'Contraseña acutalizada'
            });
        }

        // se guardan los cambios
        await Usuario.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        res.json({
            ok: true,
            msg: 'Usuario actualizado con exito',
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }
};

const deleteUsuario = async(req, res = response) => {
    const id = req.params.id;
    // const uid = req.uid;

    try {
        const usuarioDB = await Usuario.findById(id);

        // Verifica si existe el usuario
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el usuario solicitado'
            });
        }

        // se guardan los cambios
        await Usuario.findByIdAndUpdate({ _id: id }, { activo: false }, { new: true });
        res.json({
            ok: true,
            msg: 'Usuario eliminado con exito',
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }
};

module.exports = {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
}