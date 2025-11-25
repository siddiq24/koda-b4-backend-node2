const express = require('express');
const router = express.Router();

const productController = require('../controllers/products.controller');
router.get('', productController.getAllProducts);
router.get('/:id', productController.getProductsById);
router.post('', productController.createNewProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
