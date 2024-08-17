const express = require('express');
const router = express.Router();
const productModel = require('../models/product-model');
const ownerModel = require('../models/owner-model');

router.get('/', (req, res, next) => {
    res.status(200).send('products');
});

router.get('/all', async (req, res, next) => {
    const products = await productModel.find().populate('owner');
    if(products) {
        res.json({message: "sucessfully got products", products: products});
    } else {
        res.json({message: "failed to get products", products: []});
    }
});

module.exports = router;