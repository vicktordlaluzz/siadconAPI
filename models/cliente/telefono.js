const { Schema, model } = require('mongoose');

const TelefonoSchema = Schema({
    numero: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String
    },
    favorito: {
        type: Boolean,
        required: true
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