const bcrypt = require('bcrypt');

const userModel = require('../models/user-model');

module.exports.registerUser = async (req, res, next) => {
    let {fullname, email, password} = req.body;
    const userPresent = await userModel.findOne({email: email});
    if(userPresent){
        let name = fullname.charAt(0).toUpperCase() + fullname.slice(1);
        res.status(401).json({message: `${name} you already have an account with this email`});
    }
    else {
        bcrypt.genSalt(10, (err, salt) => {
            if(salt){
                bcrypt.hash(password, salt, async (err, hash) => {
                    if(hash){
                        const createdUser = await userModel.create({
                            fullname,
                            email,
                            password: hash
                        });
                        if(createdUser){
                            res.status(200).json({message: 'successfully created user'});
                        } else {
                            res.status(500).json({message: 'error creating user'});
                        }
                    } else {
                        res.status(500).json({message: 'error creating user'});
                    }
                });
            } else {
                res.status(500).json({message: 'error creating user'});
            }
        });
    }
}

module.exports.loginUser = async (req, res, next) => {
    let {email, password} = req.body;
    const user = await userModel.findOne({email: email});
    if(user){
        bcrypt.compare(password, user.password, (err, result) => {
            if(result){
                res.status(200).send({message: 'successful login', info: user._id, name:user.fullname});
            } else {
                res.status(500).send({message: 'login failed'});
            }
        });
    } else {
        res.status(500).send({message: 'login failed'});
    }
}

module.exports.validateUser = async (req, res, next) => {
    let {info} = req.body;
    const user = await userModel.findOne({_id: info});
    if(user){
        res.status(201).json({message: 'user validated', user:user});
    } else {
        res.status(503).json({message: 'error validating user'});
    }
}