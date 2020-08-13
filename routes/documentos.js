const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');
const fileUpload = require('express-fileupload');
const router = Router();
const { getTipos, createTipo, deleteTipo } = require('../controllers/documentos/tipoDocumentos');
const { getDocumentos, saveDocumento, getDocumento, deleteDocumento } = require('../controllers/documentos/documentos');


// Obtener todos los docuemtos de un cliente
router.get('/tipos', [
    validarJWT
], getTipos);

router.post('/tipos', [
    validarJWT,
    check('tipo', 'El campo tipo es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatoria').notEmpty(),
    validarCampos
], createTipo);

router.delete('/tipos/:id', [
    validarJWT
], deleteTipo);

router.use(fileUpload());

// Obtener todos los docuemtos de un cliente
router.get('/:cliente', [
    validarJWT
], getDocumentos);

// Sube un nuevo documento
router.put('/:cliente', [
    validarJWT,
    check('tipoDocumento', 'No se indico el tipo de documento').notEmpty(),
    check('comentarios', 'Porfavor agregue una descripcion').notEmpty(),
    validarCampos
], saveDocumento);

router.get('/downloads/:documento', [
    validarJWT
], getDocumento);

router.delete('/:documento', [
    validarJWT
], deleteDocumento);

module.exports = router;