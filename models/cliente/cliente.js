const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apaterno: {
        type: String,
        required: true
    },
    amaterno: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefonos: {
        type: Schema.Types.ObjectId[],
        ref: 'Telefono'
        required: true
    },
    direcciones: {
        type: Schema.Types.ObjectId[],
        ref: 'Direccion'
        required: true
    },  
    tramites: {
        type: Schema.Types.ObjectId[],
        ref: 'Tramite'
    },  
    documentos: {
        type: Schema.Types.ObjectId[],
        ref: 'Documento'
        required: true
    },  
    fecha: {
        type: Date,
        required: true
    },
    usuarioA: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
        required: true
    },
    usuarioM: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
        required: true
    },
    comentarios: {
        type: String,
        required: true
    }
});


module.exports = model('Cliente', ClienteSchema);