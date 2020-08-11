const { response } = require('express');
const Hipoteca = require('../../models/tramite/hipoteca');

const getHipoteca = async(req, res = response) => {
    try {
        const hipotecas = await Hipoteca.find({ activo: true })
            .populate('usuario', 'nombre role');
        res.json({
            ok: true,
            hipotecas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};

const createHipoteca = async(req, res = response) => {
    try {
        let hip = Hipoteca(req.body);
        hip.usuario = req.uid;
        const hipDB = await hip.save();
        res.json({
            ok: true,
            hipDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al adminstrador'
        })
    }
};

const deleteHipoteca = async(req, res = response) => {
    const id = req.params.id;

    try {
        const hipDB = await Hipoteca.findById(id);

        // Verifica si existe el usuario
        if (!hipDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        // se guardan los cambios
        await Hipoteca.findByIdAndUpdate({ _id: id }, { activo: false }, { new: true });
        res.json({
            ok: true,
            msg: 'Hipoteca eliminada con exito',
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }
};

const udateHipoteca = async(req, res = response) => {
    const id = req.params.id;

    try {
        const hipDB = await Hipoteca.findById(id);

        // Verifica si existe el usuario
        if (!hipDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        let update = hipDB;
        update.nombre = req.body.nombre;
        update.descripcion = req.body.descripcion;
        update.usuario = req.uid;

        // se guardan los cambios
        await Hipoteca.findByIdAndUpdate({ _id: id }, update, { new: true });
        res.json({
            ok: true,
            msg: 'Hipoteca actualizada con exito',
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
    getHipoteca,
    createHipoteca,
    udateHipoteca,
    deleteHipoteca
}