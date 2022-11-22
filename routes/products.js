/*
    path : /api/products
*/
const { Router } = require('express');
const { newProuct, getAllProducts, updateProduct, productChangeStatus } = require('../controller/products_controller');
const { validatorJWT } = require('../middlewares/validator_jwt');

const router = Router();

// Ruta para tener todos los productos
router.get('/', [validatorJWT], getAllProducts);
// Ruta para crear un producto
router.post('/new/', [validatorJWT], newProuct);
// Ruta para editar un producto
router.post('/edit/', [validatorJWT], updateProduct);
// Ruta para desactivar un producto
router.post('/disabled/', [validatorJWT], productChangeStatus);

module.exports = router;
