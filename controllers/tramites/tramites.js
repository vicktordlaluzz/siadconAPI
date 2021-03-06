const { response } = require('express');
const Tramite = require('../../models/tramite/tramite');
const tramite = require('../../models/tramite/tramite');

const getTramites = async(req, res = response) => {
    try {
        const tramites = await Tramite.find()
            .populate('registro', 'nombre')
            .populate('hipoteca', 'nombre')
            .populate('tipo', 'nombre')
            .populate('usuarioAlta', 'nombre')
            .populate('usuarioMod', 'nombre img')
            .populate('cliente', 'nombre apaterno amaterno rfc')
            .populate('estado', 'estado');
        res.json({
            ok: true,
            tramites
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};

const createTramite = async(req, res = response) => {
    try {
        let tramite = Tramite();
        tramite.cliente = req.body.cliente;
        tramite.anio = req.body.anio;
        tramite.tipo = req.body.tipoTramite;
        tramite.registro = {
            registro: req.body.registro || null,
            monto: req.body.registroM
        } || null;
        tramite.hipoteca = {
            registro: req.body.hipoteca || null,
            monto: req.body.hipotecaM
        } || null;
        tramite.montoS = req.body.montoS || 0;
        tramite.montoA = req.body.montoA || 0;
        tramite.honorario = req.body.honorario || 0;
        tramite.comentarios = req.body.comentarios;
        tramite.usuarioAlta = req.uid;
        tramite.usuarioMod = req.uid;
        tramite.fechaI = new Date();
        tramite.modificacion = new Date();
        const tramiteDB = await tramite.save();
        res.json({
            ok: true,
            msg: 'El tramite ha sido dado de alta correctamente',
            tramiteDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al adminstrador'
        })
    }
};

const deleteTramite = async(req, res = response) => {
    const id = req.params.id;

    try {
        const tramiteDB = await Tramite.findById(id);

        // Verifica si existe el usuario
        if (!tramiteDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        // se guardan los cambios
        await Tramite.findByIdAndUpdate({ _id: id }, { activo: false, usuario: req.uid, modificacion: new Date() }, { new: true });
        res.json({
            ok: true,
            msg: 'Tramite eliminado con exito',
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }
};

const updateTramite = async(req, res = response) => {
    const id = req.params.id;

    try {
        const tramite = await Tramite.findById(id);

        // Verifica si existe el usuario
        if (!tramite) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        let update = req.body;
        update.modificacion = new Date();
        update.usuarioMod = req.uid;

        // se guardan los cambios
        await Tramite.findByIdAndUpdate({ _id: id }, update, { new: true });
        res.json({
            ok: true,
            msg: 'Tramite actualizado con exito',
            update
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }
};

const getTramite = async(req, res = response) => {
    tramiteID = req.params.tramiteID;
    try {
        const tramite = await Tramite.findById(tramiteID)
            .populate({
                path: 'registro',
                populate: {
                    path: 'registro',
                    model: 'Registro'
                }
            }).populate({
                path: 'hipoteca',
                populate: {
                    path: 'registro',
                    model: 'Hipoteca'
                }
            })
            .populate('tipo', 'nombre')
            .populate('usuarioAlta', 'nombre')
            .populate('usuarioMod', 'nombre img')
            .populate('cliente', 'nombre apaterno amaterno rfc')
            .populate('estado', 'estado');
        if (!tramite) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro el documento solicitado'
            });
        }
        res.json({
            ok: true,
            tramite
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};

const getByCliente = async(req, res = response) => {
    clienteId = req.params.clienteId;
    try {
        const tramite = await Tramite.find({ cliente: clienteId })
            .populate({
                path: 'registro',
                populate: {
                    path: 'registro',
                    model: 'Registro'
                }
            }).populate({
                path: 'hipoteca',
                populate: {
                    path: 'registro',
                    model: 'Hipoteca'
                }
            })
            .populate('tipo', 'nombre')
            .populate('usuarioAlta', 'nombre')
            .populate('usuarioMod', 'nombre img')
            .populate('cliente', 'nombre apaterno amaterno rfc')
            .populate('estado', 'estado');
        if (!tramite) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro el documento solicitado'
            });
        }
        res.json({
            ok: true,
            tramite
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};

module.exports = {
    getTramites,
    createTramite,
    deleteTramite,
    updateTramite,
    getTramite,
    getByCliente
};