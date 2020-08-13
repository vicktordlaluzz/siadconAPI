const { Schema, model } = require('mongoose');

const TipoDocumentoSchema = Schema({
    img: {
        type: String,
        required: true
    },
    comentarios: {
        type: String,
        required: true
    },
    tipoDocumento: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDocumento'
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente'
    }
});


module.exports = model('Documento', TipoDocumentoSchema);