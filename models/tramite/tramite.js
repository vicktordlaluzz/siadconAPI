const { Schema, model } = require('mongoose');

const tramiteSchema = Schema({
    fechaI: {
        type: Date,
        required: true
    },
    modificacion: {
        type: Date,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    anio: {
        type: Number,
        required: true
    },
    registro: {
        type: [Schema.Types.ObjectId],
        ref: 'Registro',
        required: true
    },
    hipoteca: {
        type: [Schema.Types.ObjectId],
        ref: 'Hipoteca',
        required: true
    },
    tipo: {
        type: [Schema.Types.ObjectId],
        ref: 'TipoTramite',
        required: true
    },
    gastosDeducibles: {
        type: [Schema.Types.ObjectId],
        ref: 'TipoGasto',
        required: true
    },
    comentarios: {
        type: String,
    },
    usuarioAlta: {
        type: [Schema.Types.ObjectId],
        ref: 'Usuario',
        required: true
    },
    usuarioMod: {
        type: [Schema.Types.ObjectId],
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: [Schema.Types.ObjectId],
        ref: 'EstadoTramite',
        required: true
    }
});


module.exports = model('Tramite', tramiteSchema);