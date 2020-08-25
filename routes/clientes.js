const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');
const { validarDirecciones, validarTelefonos } = require('../middlewares/custom-validators')

const router = Router();
const { getClientes, createCliente, updateCliente, deleteCliente, getCliente } = require('../controllers/clientes');

// Obtener todos los usuarios
router.get('/', [
    validarJWT
], getClientes);

// Crear un nuevo usario
router.post('/', [
    validarJWT,
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('apaterno', 'El campo nombre es obligatorio').notEmpty(),
    check('curp', 'El campo nombre es obligatorio').notEmpty(),
    check('rfc', 'El campo nombre es obligatorio').notEmpty(),
    check('nss', 'El campo nombre es obligatorio').notEmpty(),
    check('direcciones', 'Se debe definir al menos una direccion valida').notEmpty(),
    //check('telefonos', 'Se debe definir al menos un numero de contacto valido').notEmpty(),
    validarCampos
], createCliente);

// Actualiza un usuario
router.put('/:id', [
    validarJWT
], updateCliente);

router.get('/:cliente', [
    validarJWT
], getCliente);
// Actualiza un usuario
router.delete('/:id', [], deleteCliente);

module.exports = router;