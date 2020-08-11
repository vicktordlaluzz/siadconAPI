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
} = require('../controllers/tramites/hipotecas');

const {
    getTiposGasto,
    createGasto,
    deleteGasto,
    updateGasto
} = require('../controllers/tramites/tipoGastos');

const {
    getTipoTramite,
    createTipoTramite,
    deleteTipooTramite,
    updateTipoTramite
} = require('../controllers/tramites/tipoTramite');

const {
    getEstados,
    createEstado,
    deleteEstado,
    updateEstado
} = require('../controllers/tramites/estados')

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

// gastos
router.get('/gastos', [
    validarJWT
], getTiposGasto);

router.post('/gastos', [
    validarJWT,
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('descripcion', 'El campo descripcion es obligatorio').notEmpty(),
    validarCampos
], createGasto);

router.put('/gastos/:id', [
    validarJWT
], updateGasto);

router.delete('/gastos/:id', [
    validarJWT
], deleteGasto);

// tipo tramite
router.get('/tipos', [
    validarJWT
], getTipoTramite);

router.post('/tipos', [
    validarJWT,
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('descripcion', 'El campo descripcion es obligatorio').notEmpty(),
    validarCampos
], createTipoTramite);

router.put('/tipos/:id', [
    validarJWT
], updateTipoTramite);

router.delete('/tipos/:id', [
    validarJWT
], deleteTipooTramite);

// estado tramite
router.get('/estados', [
    validarJWT
], getEstados);

router.post('/estados', [
    validarJWT,
    check('estado', 'El campo estado es obligatorio').notEmpty(),
    check('descripcion', 'El campo descripcion es obligatorio').notEmpty(),
    validarCampos
], createEstado);

router.put('/estados/:id', [
    validarJWT
], updateEstado);

router.delete('/estados/:id', [
    validarJWT
], deleteEstado);

module.exports = router;