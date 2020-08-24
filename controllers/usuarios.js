const { response } = require('express');
const Usuario = require('../models/usuario/usuario');
const Role = require('../models/usuario/role');
const Direccion = require('../models/cliente/direccion');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res = response) => {
    try {
        const usuarios = await Usuario.find({ activo: true }, 'nombre apaterno amaterno puesto telefono direccion email img').
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
        let usr = new Usuario();
        usr.nombre = req.body.nombre;
        usr.apaterno = req.body.apaterno;
        usr.amaterno = req.body.amaterno || null;
        usr.puesto = req.body.puesto;
        usr.email = req.body.email;
        usr.rfc = req.body.rfc;
        usr.curp = req.body.curp;
        usr.telefono = req.body.telefono;
        usr.img = 'no-img.jpg';
        usr.role = await Role.find({ nombre: 'usuario' })._id;
        usr.direccion.calle = req.body.calle;
        usr.direccion.numeroE = req.body.numeroE || null;
        usr.direccion.numeroI = req.body.numeroI || null;
        usr.direccion.colonia = req.body.colonia;
        usr.direccion.municipio = req.body.municipio;
        usr.direccion.estado = req.body.estado;
        const pass = req.body.rfc;
        // Encriptacion de la contraseña
        const salt = bcrypt.genSaltSync();
        usr.pass = bcrypt.hashSync(pass, salt);


        console.log(req.body.email);
        // Guardar usuario
        const usuarioDB = await usr.save();

        // Respondemos con el usuario guardado
        res.json({
            ok: true,
            usuarioDB,
            msg: 'Usuario guardado exitosamente.'
        });

    } catch (error) {
        // Control del codigo de error
        if (error.code === 11000) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya se encuentra registrado',
                error
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
            let pass = req.body.pass;
            const salt = bcrypt.genSaltSync();
            pass = bcrypt.hashSync(pass, salt);
            const usuario = await Usuario.findOneAndUpdate({ _id: id }, { pass: pass }, { new: true });
            console.log(usuario);
            return res.json({
                ok: true,
                msg: 'Contraseña acutalizada'
            });
        }

        // se guardan los cambios
        const usr = {
            nombre: req.body.nombre,
            apaterno: req.body.apaterno,
            amaterno: req.body.amaterno || null,
            email: req.body.email,
            rfc: req.body.rfc,
            curp: req.body.curp,
            telefono: req.body.telefono,
            direccion: {
                calle: req.body.calle,
                numeroE: req.body.numeroE || null,
                numeroI: req.body.numeroI || null,
                colonia: req.body.colonia,
                municipio: req.body.municipio,
                estado: req.body.estado
            }
        };
        await Usuario.findByIdAndUpdate({ _id: id }, usr, { new: true });
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

const chargeImg = async(req, res = response) => {
    console.log(req);
    const usuario = req.params.usuario;

    try {
        // validar si se envio algun archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({
                ok: false,
                msg: 'No se recibio ningun archivo.'
            });
        }

        const usrDB = await Usuario.findById(usuario);

        if (!usrDB) {
            return res.status(400).send({
                ok: false,
                msg: 'No se encontro el usuario solicitado'
            });
        }

        // se obtiene el arhivo
        const file = req.files.img;

        // se corta el nombre por los puntos
        const nombreCortado = file.name.split('.');

        // se obtiene la extencion del archivo
        const extencion = nombreCortado[nombreCortado.length - 1];

        // extenciones de archivo validas
        const extencionesValidas = ['jpg', 'jpeg', 'gif', 'png'];

        // se valida si el archivo tiene una extencion valida
        if (!extencionesValidas.includes(extencion)) {
            return res.status(400).json({
                ok: false,
                msg: 'Asegurese que el documento sea un archivo válido'
            })
        }

        // generar el nombre de la imagen
        const nombreArchivo = `${uuidv4()}.${extencion}`;

        // path para guardar la imagen
        const path = `./uploads/images/${nombreArchivo}`;

        // mover la imagen
        file.mv(path, async(err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Algo salio mal al guardar la imagen'
                });
            }
            await Usuario.findOneAndUpdate({ _id: usuario }, { img: nombreArchivo }, { new: true });
            res.json({
                ok: true,
                msg: 'archivo cargado con exito',
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }

};

const getImg = async(req, res = response) => {
    const img = req.params.img;

    let pathImg = path.join(__dirname, `../uploads/images/${img}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }

}

const getUsuario = async(req, res = response) => {
    const uid = req.params.usuario;
    console.log(uid);
    try {
        const usuario = await Usuario.findOne({ _id: uid }, { pass: 0 });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro el usuario solicitado'
            })
        }
        res.json({
            ok: true,
            usuario
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Algo salio mal porfavor contacte al administrador'
        })
    }
}
module.exports = {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    chargeImg,
    getImg,
    getUsuario
}