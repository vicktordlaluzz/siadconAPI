const { Schema, model } = require('mongoose');

const TipoDocumentoSchema = Schema({
    tipo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});


module.exports = model('TipoDocumento', TipoDocumentoSchema);