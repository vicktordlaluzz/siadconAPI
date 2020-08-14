const { response } = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Comprobante = require('../../models/ticket/comprobante')

const getComprobantes = async(req, res = response) => {
    try {
        const comprobantes = await Comprobante.find();
        res.json({
            ok: true,
            comprobantes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favpr contacte al administrador'
        });
    }
};

const createComprobante = async(req, res = response) => {
    const ticket = req.params.ticket;

    try {
        // validar si se envio algun archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({
                ok: false,
                msg: 'No se recibio ningun archivo.'
            });
        }

        // se obtiene el arhivo
        const file = req.files.img;

        // se corta el nombre por los puntos
        const nombreCortado = file.name.split('.');

        // se obtiene la extencion del archivo
        const extencion = nombreCortado[nombreCortado.length - 1];

        // extenciones de archivo validas
        const extencionesValidas = ['pdf'];

        // se valida si el archivo tiene una extencion valida
        if (!extencionesValidas.includes(extencion)) {
            return res.status(400).json({
                ok: false,
                msg: 'Asegurese que el documento sea un archivo PDF válido'
            })
        }

        // generar el nombre de la imagen
        const nombreArchivo = `${uuidv4()}.${extencion}`;

        // path para guardar la imagen
        const path = `./uploads/comprobantes/${nombreArchivo}`;

        // mover la imagen
        file.mv(path, async(err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Algo salio mal al guardar la imagen'
                });
            }

            const comprobante = new Comprobante({
                img: nombreArchivo,
                fecha: new Date(),
                folio: req.body.folio,
                monto: req.body.monto,
                ticket: ticket
            });

            const comprobanteDB = await comprobante.save();
            res.json({
                ok: true,
                msg: 'archivo cargado con exito',
                comprobanteDB
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

module.exports = {
    getComprobantes,
    createComprobante
}