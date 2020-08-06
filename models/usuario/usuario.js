const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
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
        type: String
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }

});


module.exports = model('Usuario', UsuarioSchema);