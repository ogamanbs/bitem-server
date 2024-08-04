const express = require('express');
const router = express.Router();
const productModel = require('../models/product-model');

router.get('/', (req, res, next) => {
    res.send('products');
})

router.get('/all', async (req, res, next) => {
    const products = await productModel.find();
    if(products) {
        res.json({message: "sucessfully got products", products: products});
    } else {
        res.json({message: "failed to get products", products: []});
    }
});

module.exports = router;