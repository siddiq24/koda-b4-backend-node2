const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const productController = require('../controllers/products.controller');
router.get('',
    param('search').optional().isString(),
    productController.getAllProducts);
router.get('/:id', productController.getProductsById);
router.post('',
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    productController.createNewProduct);
router.patch('/:id',

    productController.updateProduct);
router.delete('/:id',

    productController.deleteProduct);
router.post('/:id/upload',

    productController.uploadPictureProduct);

module.exports = router;
