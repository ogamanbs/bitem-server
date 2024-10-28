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

router.post('/specific', async (req, res, next) => {
    const { id } = req.body;
    console.log(id);
    const product = await productModel.findOne({_id:id});
    if(product) {
        res.status(200).json({message: "sucessfully got product", product: product});
    } else {
        res.status(304).json({message: "failed to get product", product: {}});
    }
});

module.exports = router;