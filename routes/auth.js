const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');


const router = Router();

router.post('/', [
    check('email', 'Introduzca un email valido').isEmail(),
    check('pass', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);


module.exports = router;