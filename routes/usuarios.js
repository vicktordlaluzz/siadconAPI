const { Router } = require('express');
// const { check } = require('express-validator');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
const { getUsuarios, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios');

// Obtener todos los usuarios
router.get('/', [], getUsuarios);

// Crear un nuevo usario
router.post('/', [], createUsuario);

// Actualiza un usuario
router.put('/:id', [], updateUsuario);

// Actualiza un usuario
router.delete('/:id', [], deleteUsuario);

module.exports = router;