const { response } = require('express');
const Registro = require('../../models/tramite/registro');

const getRegistros = async(req, res = response) => {
    try {
        const registros = await Registro.find({ activo: true })
            .populate('usuario', 'nombre role');
        res.json({
            ok: true,
            registros
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};

const createRegistro = async(req, res = response) => {
    try {
        let reg = Registro(req.body);
        reg.usuario = req.uid;
        const regDB = await reg.save();
        res.json({
            ok: true,
            regDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al adminstrador'
        })
    }
};

const deleteRegistro = async(req, res = response) => {
    const id = req.params.id;

    try {
        const regDB = await Registro.findById(id);

        // Verifica si existe el usuario
        if (!regDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        // se guardan los cambios
        await Registro.findByIdAndUpdate({ _id: id }, { activo: false }, { new: true });
        res.json({
            ok: true,
            msg: 'Registro eliminado con exito',
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
    getRegistros,
    createRegistro,
    deleteRegistro
}