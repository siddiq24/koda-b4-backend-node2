const upload = require('../libs/upload');
const productModel = require('../models/products.model')
require("dotenv").config();

/**
 * GET /products
 * @summary Retrieve all products
 * @tags Products
 * @param {string} search.query - Search term for filtering products by name
 * @param {int} categoryId.query - Search term for filtering products by category
 * @return {object} 200 - Products retrieved successfully
 */
async function getAllProducts(req, res) {
    const search = req.query.search || '';
    const categoryId = parseInt(req.query.categoryId) || '';
    const products = await productModel.getAllProducts(search, categoryId);

    if (products.length === 0) {
        return res.json({
            success: true,
            message: "No products found",
            data: []
        });
    }
    res.json({
        success: true,
        message: "Products retrieved successfully",
        data: products
    });
}


/**
 * GET /products/{id}
 * @summary Retrieve a product by ID
 * @tags Products
 * @param {string} id.path.required - Product ID
 * @return {object} 200 - Product retrieved successfully
 */
async function getProductsById(req, res) {
    const productId = req.params.id;
    console.log(productId)
    const product = await productModel.getProductById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json({
        success: true,
        message: "Product retrieved successfully",
        data: product
    })
}

/**
 * POST /products
 * @summary Create a new product
 * @tags Products
 * @param {object} request.body.required - New product data
 * @example request - Example new product data
 * {
 *   "name": "Nano nano",
 *   "price": 30.50,
 *   "description": "A new innovative product",
 *   "categoryId": 2,
 * }
 * @return {object} 201 - Product created successfully
 * @return {object} 400 - Invalid product data
 */
function createNewProduct(req, res) {
    const newProduct = req.body;
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.categoryId) {
        return res.status(400).json({
            success: false,
            message: "Invalid product data"
        });
    }
    const createdProduct = productModel.createProduct(newProduct);
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: createdProduct
    });
}

/**
 * PATCH /products/{id}
 * @summary Update a product by ID
 * @tags Products
 * @param {string} id.path.required - Product ID
 * @param {object} request.body.required - Updated product data
 * @example request - Example updated product data
 * {
 *  "name": "Updated Product Name",
 *  "price": 99.99,
 *  "description": "Updated product description",
 *  "categoryId": 1
 * }
 * @return {object} 200 - Product updated successfully
 * @return {object} 400 - Invalid product data
 */
function updateProduct(req, res) {
    const productId = req.params.id;
    const updatedProduct = req.body;

    if (!updatedProduct.name || !updatedProduct.price) {
        return res.status(400).json({
            success: false,
            message: "Invalid product data"
        });
    }

    productModel.updateProduct(productId, updatedProduct);
    res.json({
        success: true,
        message: "Product updated successfully"
    });
}

/**
 * DELETE /products/{id}
 * @summary Delete a product by ID
 * @tags Products
 * @param {string} id.path.required - Product ID
 * @return {object} 200 - Product deleted successfully
 * @return {object} 404 - Product not found
 */
function deleteProduct(req, res) {
    const productId = req.params.id;
    productModel.deleteProduct(productId);
    res.json({
        success: true,
        message: "Product deleted successfully"
    });
}

/**
 * A song
 * @typedef {object} Upload
 * @property {string} picture - image cover - binary
 */

/**
 * POST /products/{id}/upload
 * @summary Upload a picture for a product
 * @tags Products
 * @param {string} id.path.required - Product ID
 * @param {Upload} request.body.required - Picture file to upload - multipart/form-data
 * @return {object} 200 - Picture uploaded successfully
 */
function uploadPictureProduct(req, res) {
    const id = req.params.id;
    const product = productModel.getProductById(parseInt(id));

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    upload.single("picture")(req, res, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const updatedProduct = productModel.getProductById(parseInt(id));
        updatedProduct.picture = `${process.env.BASE_URL}/${req.file.filename}`;
        console.log(updatedProduct)

        return res.json({
            success: true,
            message: "Picture uploaded successfully",
            data: updatedProduct
        });
    });
}


module.exports = {
    getAllProducts,
    getProductsById,
    createNewProduct,
    updateProduct,
    deleteProduct,
    uploadPictureProduct
}