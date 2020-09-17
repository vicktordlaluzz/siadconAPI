const { Schema, model } = require('mongoose');

const tramiteSchema = Schema({
    fechaI: {
        type: Date,
        default: new Date()
    },
    modificacion: {
        type: Date
    },
    montoS: {
        type: Number,
        required: true
    },
    montoA: {
        type: Number
    },
    honorario: {
        type: Number
    },
    anio: {
        type: Number,
        required: true
    },
    registro: {
        registro: {
            type: Schema.Types.ObjectId,
            ref: 'Registro'
        },
        monto: {
            type: Number
        },
        required: false
    },
    hipoteca: {
        registro: {
            type: Schema.Types.ObjectId,
            ref: 'Hipoteca'
        },
        monto: {
            type: Number
        },
        required: false
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'TipoTramite',
        required: true
    },
    comentarios: {
        type: String
    },
    usuarioAlta: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    usuarioMod: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoTramite'
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    activo: {
        type: Boolean,
        default: true,
        required: true
    }
});


module.exports = model('Tramite', tramiteSchema);