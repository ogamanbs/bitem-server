const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
    
router.post('/create', async (req, res, next) => {
    let owners = await ownerModel.find();
    if(owners.length > 0){
        return res.status(503).send('you don\'t have permission to create a new owner');
    }
    let { fullname, email, password } = req.body;
    const createdOwner = await ownerModel.create({
        fullname: fullname,
        email: email,
        password: password
    });
    res.status(201).send(createdOwner);
});

router.get('/', (req, res, next) => {
    res.render('form');
});

module.exports = router;