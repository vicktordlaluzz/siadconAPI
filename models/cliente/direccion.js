const { Schema, model } = require('mongoose');

const DireccionSchema = Schema({
    calle: {
        type: String,
        required: true
    },  
    n_ext: {
        type: String,
        required: true,
    },  
    n_int: {
        type: String
    },  
    colonia: {
        type: String,
        required: true,
    },  
    municipio: {
        type: String,
        required: true,
    },  
    estado: {
        type: String,
        required: true,
    },  
    favorita: {
        type: Boolean,
        required: true
    }
});


module.exports = model('Direccion', DireccionSchema);