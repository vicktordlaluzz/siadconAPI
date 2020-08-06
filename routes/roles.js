const { Router } = require('express');
// const { check } = require('express-validator');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
const { getRoles, createRole } = require('../controllers/roles');

// Obtener todos los usuarios
router.get('/', [], getRoles);
router.post('/', createRole);

module.exports = router;