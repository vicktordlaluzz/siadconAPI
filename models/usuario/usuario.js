const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
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
    puesto: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        required: true,
        default: 'no-img.jpg'
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }

});


module.exports = model('Usuario', UsuarioSchema);