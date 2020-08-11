const { response } = require('express');
const Estado = require('../../models/tramite/estadoTramite');

const getEstados = async(req, res = response) => {
    try {
        const estados = await Estado.find({ activo: true })
            .populate('usuario', 'nombre role');
        res.json({
            ok: true,
            estados
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};

const createEstado = async(req, res = response) => {
    try {
        let estado = Estado(req.body);
        estado.usuario = req.uid;
        const estadoDB = await estado.save();
        res.json({
            ok: true,
            estadoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al adminstrador'
        })
    }
};

const deleteEstado = async(req, res = response) => {
    const id = req.params.id;

    try {
        const estadoDB = await Estado.findById(id);

        // Verifica si existe el usuario
        if (!estadoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        // se guardan los cambios
        await Estado.findByIdAndUpdate({ _id: id }, { activo: false, usuario: req.uid }, { new: true });
        res.json({
            ok: true,
            msg: 'Estado eliminado con exito',
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }
};

const updateEstado = async(req, res = response) => {
    const id = req.params.id;

    try {
        const estado = await Estado.findById(id);

        // Verifica si existe el usuario
        if (!estado) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        let update = estado;
        update.estado = req.body.estado;
        update.descripcion = req.body.descripcion;
        update.usuario = req.uid;

        // se guardan los cambios
        await Estado.findByIdAndUpdate({ _id: id }, update, { new: true });
        res.json({
            ok: true,
            msg: 'Estado actualizado con exito',
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

module.exports = {
    getEstados,
    createEstado,
    deleteEstado,
    updateEstado
}