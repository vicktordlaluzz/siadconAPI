const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');

const router = Router();
const {
    getRegistros,
    createRegistro,
    deleteRegistro
} = require('../controllers/tramites/registros');

const {
    getHipoteca,
    createHipoteca,
    udateHipoteca,
    deleteHipoteca
} = require('../controllers/tramites/hipotecas')

// Registros
router.get('/registros', [
    validarJWT
], getRegistros);

router.post('/registros/', [
    validarJWT,
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('descripcion', 'El campo descripcion es obligatorio').notEmpty(),
    validarCampos
], createRegistro);

router.delete('/registros/:id', [
    validarJWT
], deleteRegistro);

// hipoteca
router.get('/hipotecas', [
    validarJWT
], getHipoteca);

router.post('/hipotecas', [
    validarJWT,
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('descripcion', 'El campo descripcion es obligatorio').notEmpty(),
    validarCampos
], createHipoteca);

router.put('/hipotecas/:id', [
    validarJWT
], udateHipoteca);

router.delete('/hipotecas/:id', [
    validarJWT
], deleteHipoteca);

module.exports = router;