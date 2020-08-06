const { Schema, model } = require('mongoose');

const EstadoTramiteSchema = Schema({
    estado: {
        type: String,
        required: true
    },  
    descripcion: {
        type: String,
        required: true
    }
});


module.exports = model('EstadoTramite', EstadoTramiteSchema);