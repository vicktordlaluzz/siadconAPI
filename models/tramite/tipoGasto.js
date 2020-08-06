const { Schema, model } = require('mongoose');

const TipoGastoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },  
    descripcion: {
        type: String,
        required: true
    }
});


module.exports = model('TipoGasto', TipoGastoSchema);