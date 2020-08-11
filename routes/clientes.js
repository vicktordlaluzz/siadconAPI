const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');
const { validarDirecciones, validarTelefonos } = require('../middlewares/custom-validators')

const router = Router();
const { getClientes, createCliente, updateCliente, deleteCliente } = require('../controllers/clientes');

// Obtener todos los usuarios
router.get('/', [
    validarJWT
], getClientes);

// Crear un nuevo usario
router.post('/', [
    validarJWT,
    check('cliente.nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('cliente.apaterno', 'El campo nombre es obligatorio').notEmpty(),
    check('cliente.curp', 'El campo nombre es obligatorio').notEmpty(),
    check('cliente.rfc', 'El campo nombre es obligatorio').notEmpty(),
    check('cliente.nss', 'El campo nombre es obligatorio').notEmpty(),
    validarDirecciones,
    validarTelefonos,
    validarCampos
], createCliente);

// Actualiza un usuario
router.put('/:id', [
    validarJWT
], updateCliente);

// Actualiza un usuario
router.delete('/:id', [], deleteCliente);

module.exports = router;