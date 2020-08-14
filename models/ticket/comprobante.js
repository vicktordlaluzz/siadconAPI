const { Schema, model } = require('mongoose');

const ComprobanteSchema = Schema({
    fecha: {
        type: Date,
        required: true
    },
    folio: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    monto: {
        type: Schema.Types.ObjectId,
        ref: 'Tramite',
        required: true
    },
    img: {
        type: String
    }
});


module.exports = model('Comprobante', TicketSchema);