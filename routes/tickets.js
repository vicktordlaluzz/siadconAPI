const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');

const router = Router();
const { getTickets, createTicket, updateTicket } = require('../controllers/ticket/tickets');

// Obtener todos los usuarios
router.get('/', [
    validarJWT
], getTickets);


router.post('/', [
    validarJWT,
    check('tramite', 'El campo tramite es obligatorio').notEmpty(),
    check('cliente', 'El campo cliente es obligatorio').notEmpty(),
    check('monto', 'El campo monto es obligatorio').notEmpty(),
    check('formaPago', 'El campo forma de pago es obligatorio').notEmpty(),
    check('estado', 'El campo estado es obligatorio').notEmpty(),
    validarCampos
], createTicket);

router.put('/:id', [
    validarJWT
], updateTicket);

module.exports = router;