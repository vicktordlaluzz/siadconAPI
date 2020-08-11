const { Schema, model } = require('mongoose');

const HipotecaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        required: true,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    }

});


module.exports = model('Hipoteca', HipotecaSchema);