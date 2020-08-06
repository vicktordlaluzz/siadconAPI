const { Schema, model } = require('mongoose');

const RegistroSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    img: {
        type: String
    }

});


module.exports = model('Registro', RegistroSchema);