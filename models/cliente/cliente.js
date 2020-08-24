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
    curp: {
        type: String,
        required: true
    },
    rfc: {
        type: String,
        required: true
    },
    nss: {
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
        type: String
    },
    activo: {
        type: Boolean,
        default: true
    }
});


module.exports = model('Cliente', ClienteSchema);