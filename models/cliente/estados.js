const { Schema, model } = require('mongoose');

const EstadosSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    municipios: {
        type: [String],
        required: true,
    }
});


module.exports = model('Estados', EstadosSchema);