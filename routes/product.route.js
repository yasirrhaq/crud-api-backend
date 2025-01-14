const express = require('express');
const Product = require('../models/product.model.js');
const router = express.Router();
const { getProducts, getProduct, updateProduct, deleteProduct, createProduct} = require('../controllers/product.controller.js');

// get product
router.get('/', getProducts);
router.get('/:id', getProduct);

// create product
router.post('/', createProduct);

// update product
router.put('/:id', updateProduct);

// delete product
router.delete('/:id', deleteProduct);

module.exports = router;