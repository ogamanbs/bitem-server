const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const ownerModel = require('../models/owner-model');

router.post('/create', async (req, res, next) => {
    let { name, image, email, password } = req.body;
    let owners = await ownerModel.find({email});
    if(owners){
        res.send({message: 'owner already exists'});
    } else {
        bcrypt.genSalt(10, (err, salt) => {
            try {
                bcrypt.hash(password, salt, async (err, hash) => {
                    try {
                        const createdOwner = await ownerModel.create({
                            name: name,
                            image: image,
                            email: email,
                            password: password
                        });
                        res.status(201).send({message: "owner created successfully"});
                    } catch(err) {
                        res.status(500);
                    }
                });
            } catch(err) {
                res.status(500);
            }
        });
    }
});

router.get('/', (req, res, next) => {
    res.render('form');
});

router.post('/login', (req, res, next) => {
    let {email, password} = req.body;
    const owner = ownerModel.findOne({email});
    if(owner) {
        bcrypt.compare(password, owner.password, (err, result) => {
            try {
                res.send({message: "found"});
            } catch(err) {
                res.status(401);
            }
        })
    } else {
        res.status(500);
    }
});

module.exports = router;