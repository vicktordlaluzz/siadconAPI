const { Schema, model } = require('mongoose');

const DireccionSchema = Schema({
    calle: {
        type: String,
        required: true
    },
    numeroE: {
        type: String,
        default: 'Sin numero'
    },
    numeroI: {
        type: String
    },
    colonia: {
        type: String,
        required: true,
    },
    municipio: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    cp: {
        type: String,
        required: true,
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    }
});


module.exports = model('Direccion', DireccionSchema);