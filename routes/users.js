/*
    path : api/users
*/
const { Router } = require('express');
const { getAllUsers, disabledUser } = require('../controller/users');
const { validatorJWT } = require('../middlewares/validator_jwt');

const router = Router();

// Ruta para retornar los usuarios
router.get('/', [validatorJWT], getAllUsers);

// Ruta para desactivar un usuario
router.post('/disable', [validatorJWT], disabledUser);

module.exports = router;