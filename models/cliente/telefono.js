const { Schema, model } = require('mongoose');

const TelefonoSchema = Schema({
    numero: {
        type: String,
        required: true
    },  
    tipo: {
        type: String,
        required: true,
    },  
    descripcion: {
        type: String
    },  
    favorito: {
        type: Boolean,
        required: true
    }
});


module.exports = model('Telefono', TelefonoSchema);