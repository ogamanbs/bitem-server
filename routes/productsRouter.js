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

router.post('/create', async (req, res, next) => {
    const {image, name, price, discount, bgcolor, panelColor, textColor} = req.body;
    if(image !== null && name !==  "" && name !== " " &&  bgcolor !== "" && bgcolor !== " " && panelColor !== "" && panelColor !== " " && textColor !== "" && textColor !== " " ) {
        const productCreated = await productModel.create({
            image,
            name,
            price,
            discount,
            bgcolor,
            panelcolor: panelColor,
            textcolor: textColor
        });
        if(productCreated){
            res.json({message: "product created sucessfully"});
        } else {
            res.json({message: "error creating product"});
        }
    } else {
        res.json({message: "some field is empty"});
    }
});

module.exports = router;