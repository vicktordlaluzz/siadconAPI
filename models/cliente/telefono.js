const { Schema, model } = require('mongoose');

const TelefonoSchema = Schema({
    telefono: {
        type: String,
        required: true
    },
    tipoTelefono: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    activo: {
        type: Boolean,
        default: true,
        required: true
    }
});


module.exports = model('Telefono', TelefonoSchema);