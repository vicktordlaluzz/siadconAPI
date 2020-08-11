const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');
const { validarDirecciones, validarTelefonos } = require('../middlewares/custom-validators')

const router = Router();
const {
    getRegistros,
    createRegistro,
    deleteRegistro
} = require('../controllers/tramites/registros');

// Registros
router.get('/registros', [
    validarJWT
], getRegistros);

// Crear un nuevo usario
router.post('/registros/', [
    validarJWT,
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('descripcion', 'El campo descripcion es obligatorio').notEmpty(),
    validarCampos
], createRegistro);

// Actualiza un usuario
router.delete('/registros/:id', [
    validarJWT
], deleteRegistro);

module.exports = router;