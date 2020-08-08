const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');

const router = Router();
const { getClientes, createCliente, updateCliente, deleteCliente } = require('../controllers/clientes');

// Obtener todos los usuarios
router.get('/', [
    validarJWT
], getClientes);

// Crear un nuevo usario
router.post('/', [], createCliente);

// Actualiza un usuario
router.put('/:id', [], updateCliente);

// Actualiza un usuario
router.delete('/:id', [], deleteCliente);

module.exports = router;