const { Schema, model } = require('mongoose');

const ComprobanteSchema = Schema({
    fecha: {
        type: Date,
        required: true
    },  
    folio: {
        type: String
    },  
    monto: {
        type: Number,
        required: true
    },  
    documento: {
        type: Schema.Types.ObjectId,
        ref: 'Documento'
    }
});


module.exports = model('Comprobante', ComprobanteSchema);