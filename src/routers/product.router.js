const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const authenticate = require("../middlewares/auth.middleware");

const productController = require('../controllers/products.controller');
router.get('',
    param('search').optional().isString(),
    productController.getAllProducts);

router.get('/:id',
    param('id').isInt().withMessage('Product ID must be an integer'),
    productController.getProductsById);

router.post('',
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    authenticate,
    productController.createNewProduct);

router.patch('/:id',
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('categoryId').optional().isInt().withMessage('Category ID must be an integer'),
    body('description').optional().isString().withMessage('Description must be a string'),
    authenticate,
    productController.updateProduct);

router.delete('/:id',
    param('id').isInt().withMessage('Product ID must be an integer'),
    authenticate,
    productController.deleteProduct);

router.post('/:id/upload',
    param('id').isInt().withMessage('Product ID must be an integer'),
    body('picture').notEmpty().withMessage('Picture is required'),
    authenticate,
    productController.uploadPictureProduct);

module.exports = router;