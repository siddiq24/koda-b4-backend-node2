const express = require('express');
const router = express.Router();
const authRouter = require('./auth.router');
const productRouter = require('./product.router');

router.use('/products', productRouter);
router.use('/auth', authRouter);

module.exports = router;