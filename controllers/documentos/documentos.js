const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const Documento = require('../../models/documento/documento')

const saveDocumento = async(req, res = response) => {

    console.log(req);
    const cliente = req.params.cliente;

    try {
        // validar si se envio algun archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({
                ok: false,
                msg: 'No se recibio ningun archivo.'
            });
        }

        // se obtiene el arhivo
        const file = req.files.documento;

        // se corta el nombre por los puntos
        const nombreCortado = file.name.split('.');

        // se obtiene la extencion del archivo
        const extencion = nombreCortado[nombreCortado.length - 1];

        // extenciones de archivo validas
        const extencionesValidas = ['pdf', 'PDF'];

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
        const path = `./uploads/documentos/${nombreArchivo}`;

        // mover la imagen
        file.mv(path, async(err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Algo salio mal al guardar la imagen'
                });
            }

            const documento = new Documento({
                img: nombreArchivo,
                comentarios: req.body.comentarios,
                tipoDocumento: req.body.tipoDocumento,
                cliente: cliente
            })
            const documentoDB = await documento.save();
            res.json({
                ok: true,
                msg: 'Archivo cargado con exito',
                documentoDB
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

const getDocumentos = async(req, res = response) => {
    const cliente = req.params.cliente;

    try {
        let docs = await Documento.find({ cliente: cliente });

        res.json({
            ok: true,
            docs
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        })
    }
};

const getDocumento = async(req, res = response) => {
    const documento = req.params.documento;

    let pathDoc = path.join(__dirname, `../../uploads/documentos/${documento}`);

    if (fs.existsSync(pathDoc)) {
        res.sendFile(pathDoc);
    } else {
        pathDoc = path.join(__dirname, `../../uploads/documentos/${documento}`);
        res.sendFile(pathDoc);
    }
};

const deleteDocumento = async(req, res = response) => {

    const documentoID = req.params.documento;
    try {
        const docDB = await Documento.findById(documentoID);
        if (!docDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Error en la solicitud'
            });
        }
        let pathDoc = path.join(__dirname, `../../uploads/documentos/${docDB.img}`);

        if (fs.existsSync(pathDoc)) {
            fs.unlinkSync(pathDoc);
            await Documento.findByIdAndDelete(documentoID);
            res.json({
                ok: true,
                msg: 'Se ha eliminado el documento'
            })
        } else {
            res.status(500).json({
                ok: false,
                msg: 'Algo salio mal por favor contacte al administrador'
            })
        }

    } catch (error) {

    }



};


module.exports = {
    saveDocumento,
    getDocumentos,
    getDocumento,
    deleteDocumento
}