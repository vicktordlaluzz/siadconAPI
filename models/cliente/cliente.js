const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apaterno: {
        type: String,
        required: true
    },
    amaterno: {
        type: String
    },
    email: {
        type: String
    },
    fecha: {
        type: Date,
        required: true,
        default: new Date()
    },
    usuarioA: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    usuarioM: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    comentarios: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    }
});


module.exports = model('Cliente', ClienteSchema);