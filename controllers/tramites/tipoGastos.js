const { response } = require('express');
const Gasto = require('../../models/tramite/tipoGasto');

const getTiposGasto = async(req, res = response) => {
    try {
        const gastos = await Gasto.find({ activo: true })
            .populate('usuario', 'nombre role');
        res.json({
            ok: true,
            gastos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};

const createGasto = async(req, res = response) => {
    try {
        let gas = Gasto(req.body);
        gas.usuario = req.uid;
        const gasDB = await gas.save();
        res.json({
            ok: true,
            gasDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al adminstrador'
        })
    }
};

const deleteGasto = async(req, res = response) => {
    const id = req.params.id;

    try {
        const hipDB = await Gasto.findById(id);

        // Verifica si existe el usuario
        if (!hipDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        // se guardan los cambios
        await Gasto.findByIdAndUpdate({ _id: id }, { activo: false, usuario: req.uid }, { new: true });
        res.json({
            ok: true,
            msg: 'Gasto eliminada con exito',
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }
};

const updateGasto = async(req, res = response) => {
    const id = req.params.id;

    try {
        const gasDB = await Gasto.findById(id);

        // Verifica si existe el usuario
        if (!gasDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        let update = gasDB;
        update.nombre = req.body.nombre;
        update.descripcion = req.body.descripcion;
        update.usuario = req.uid;

        // se guardan los cambios
        await Gasto.findByIdAndUpdate({ _id: id }, update, { new: true });
        res.json({
            ok: true,
            msg: 'Gasto actualizado con exito',
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
    getTiposGasto,
    createGasto,
    deleteGasto,
    updateGasto
}