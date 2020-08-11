const { response } = require('express');
const Tramite = require('../../models/tramite/tipoTramite');

const getTipoTramite = async(req, res = response) => {
    try {
        const tipoTramite = await Tramite.find({ activo: true })
            .populate('usuario', 'nombre role');
        res.json({
            ok: true,
            tipoTramite
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};

const createTipoTramite = async(req, res = response) => {
    try {
        let tipo = Tramite(req.body);
        tipo.usuario = req.uid;
        const tipoDB = await tipo.save();
        res.json({
            ok: true,
            tipoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al adminstrador'
        })
    }
};

const deleteTipooTramite = async(req, res = response) => {
    const id = req.params.id;

    try {
        const tipoDB = await Tramite.findById(id);

        // Verifica si existe el usuario
        if (!tipoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        // se guardan los cambios
        await Tramite.findByIdAndUpdate({ _id: id }, { activo: false, usuario: req.uid }, { new: true });
        res.json({
            ok: true,
            msg: 'Tipo de tramite eliminado con exito',
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }
};

const updateTipoTramite = async(req, res = response) => {
    const id = req.params.id;

    try {
        const tipoDB = await Tramite.findById(id);

        // Verifica si existe el usuario
        if (!tipoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        let update = tipoDB;
        update.nombre = req.body.nombre;
        update.descripcion = req.body.descripcion;
        update.usuario = req.uid;

        // se guardan los cambios
        await Tramite.findByIdAndUpdate({ _id: id }, update, { new: true });
        res.json({
            ok: true,
            msg: 'Tipo de tramite actualizado con exito',
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
    getTipoTramite,
    createTipoTramite,
    deleteTipooTramite,
    updateTipoTramite
}