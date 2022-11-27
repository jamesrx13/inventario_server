/*
    path : /api/proveedores
*/

const { Router } = require('express');
const { validatorJWT } = require('../middlewares/validator_jwt');
const { getAllProveedor, newProveedor, proveedorChangeStatus } = require('../controller/proveedores_controller');

const router = Router();

// Ruta para registrar un nuevo proveedor.
router.post('/new/', [validatorJWT], newProveedor);
// Ruta para regresar todos los proveedores.
router.get('/', [validatorJWT], getAllProveedor);
// Ruta para regresar todos los proveedores.
router.post('/status/', [validatorJWT], proveedorChangeStatus);

module.exports = router;
