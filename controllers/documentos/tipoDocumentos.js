const Tipo = require('../../models/documento/tipoDocumento');
const { response } = require('express');

const getTipos = async(req, res = response) => {
    try {
        const tipos = await Tipo.find();
        res.json({
            ok: true,
            tipos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favpr contacte al administrador'
        });
    }
};

const createTipo = async(req, res) => {
    try {
        const tipo = new Tipo(req.body);
        await tipo.save();
        res.json({
            ok: true,
            tipo
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al adminstrador'
        })
    }
};

const deleteTipo = async(req, res) => {
    const id = req.params.id;
    try {
        await Tipo.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Se ha eliminado con exito'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        })
    }
}

module.exports = {
    getTipos,
    createTipo,
    deleteTipo
}