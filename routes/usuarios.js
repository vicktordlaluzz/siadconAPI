const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');

const router = Router();
const { getUsuarios, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios');

// Obtener todos los usuarios
router.get('/', [
    validarJWT
], getUsuarios);

// Crear un nuevo usario
router.post('/', [
    // validarJWT,
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('email', 'El campo email debe contener un email valido').isEmail(),
    check('pass', 'La contraseña es obligatoria').notEmpty(),
    check('role', 'El campo role es obligatorio').notEmpty(),
    validarCampos
], createUsuario);

// Actualiza un usuario
router.put('/:id', [
    validarJWT
], updateUsuario);

// Actualiza un usuario
router.delete('/:id', [
    validarJWT
], deleteUsuario);

module.exports = router;