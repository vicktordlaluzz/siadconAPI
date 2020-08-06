const { Schema, model } = require('mongoose');

const TipoTramiteSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});


module.exports = model('TipoTramite', TipoTramiteSchema);