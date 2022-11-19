/*
    path : api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renewJWT } = require('../controller/auth_controller');
const { validatorForm } = require('../middlewares/validator');
const { validatorJWT } = require('../middlewares/validator_jwt');

const router = Router();

// Ruta para crear usuarios
router.post('/new', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El correo es requerido').not().isEmpty(),
    check('email', 'Correo no válido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    validatorForm
], createUser);

// Ruta para hacer LOGIN
router.post('/', [
    check('email', 'El correo es requerido').not().isEmpty(),
    check('email', 'Correo no válido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    validatorForm
], login);

// Ruta para reelevar un token expirado
router.get('/renew', [validatorJWT], renewJWT);

module.exports = router;
