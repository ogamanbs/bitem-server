const bcrypt = require('bcrypt');

const userModel = require('../models/user-model');
const productModel = require('../models/product-model');

module.exports.registerUser = async (req, res, next) => {
    const {name, image, email, password} = req.body;
    const userPresent = await userModel.findOne({email: email});
    if(userPresent){
        let fullname = name.charAt(0).toUpperCase() + name.slice(1);
        res.status(401).json({message: `${fullname} you already have an account with this email`});
    }
    else {
        bcrypt.genSalt(10, (err, salt) => {
            if(salt){
                bcrypt.hash(password, salt, async (err, hash) => {
                    if(hash){
                        const createdUser = await userModel.create({
                            name: name.toLowerCase(),
                            image,
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
    const { email, password } = req.body;
    const user = await userModel.findOne({email: email });
    if(user){
        bcrypt.compare(password, user.password, (err, result) => {
            if(result){
                res.status(200).send({ message: 'successful login', user: user });
            } else {
                res.status(500).send({ message: 'login failed' });
            }
        });
    } else {
        res.status(500).send({ message: 'login failed' });
    }
}

module.exports.getUser = async (req, res, next) => {
    const { id } = req.body;
    const user = await userModel.findOne({_id: id});
    if(user){
        res.status(200).json({message: 'user validated', user: user});
    } else {
        res.status(503).json({message: 'error validating user'});
    }
}

module.exports.addToWishlist = async (req, res, next) => {
    const { token, id } = req.body;
    const user = await userModel.findOne({_id: token});
    const product = await productModel.findOne({_id: id});
    if(user && product) {
        const updatedUser = await userModel.findOneAndUpdate(
            {_id: user._id},
            {$addToSet: {wishlist: {item: id}}},
            {returnDocument: "after"}
        );
        if(updatedUser) {
            res.status(200).json({message: 'product successfully added to user wishlist', user: updatedUser})
        }
    } else {
        res.status(500).json({message: 'error updating user wishlist', user: null});
    }
}

module.exports.removeFromWishlist = async (req, res, next) => {
    const {token, id} = req.body;
    const user = await userModel.findOne({_id: token});
    const product = await productModel.findOne({_id: id});
    if(user && product) {
        const updatedUser = await userModel.findOneAndUpdate(
            {_id: user._id},
            {$pull: {wishlist: {item: id}}},
            {returnDocument: "after"}
        );
        if(updatedUser) {
            res.status(200).json({message: 'product successfully added to user wishlist', user: updatedUser})
        }
    } else {
        res.status(500).json({message: 'error updating user wishlist', user: null});
    }
}

module.exports.getWishlist = async (req, res, next) => {
    const { id } = req.body;
    const user = await userModel.findOne({_id: id}).populate({
        path: 'wishlist',
        populate: {
            path: 'item',
            model: productModel
        }
    });
    if(user) {
        res.status(200).json({message: 'successfully fetched products', wishlist: user.wishlist});
    } else {
        res.status(500).json({message: 'error fetching products', wishlist: null});
    }
}

module.exports.getCartItems = async (req, res, next) => {
    const { id } = req.body;
    const user = await userModel.findOne({_id: id}).populate({
        path: 'cart',
        populate: {
            path: 'items',
            model: productModel
        }
    });
    if(user) {
        res.status(200).json({message: 'successfully fetched products', cartItems: user.cart});
    } else {
        res.status(500).json({message: 'error fetching products', catItems: null});
    }
}

module.exports.addToCart = async (req, res, next) => {
    const { token, id } = req.body;
    const user = await userModel.findOne({_id: token});
    const product = await productModel.findOne({_id: id});
    if(user && product) {
        const updatedUser = await userModel.findOneAndUpdate(
            {_id: user._id},
            {$addToSet: {cart: {item: id}}},
            {returnDocument: "after"}
        );
        if(updatedUser) {
            res.status(200).json({message: 'product successfully added to user wishlist', user: updatedUser})
        }
    } else {
        res.status(500).json({message: 'error updating user wishlist', user: null});
    }
}

module.exports.removeFromCart = async (req, res, next) => {
    const {token, id} = req.body;
    const user = await userModel.findOne({_id: token});
    const product = await productModel.findOne({_id: id});
    if(user && product) {
        const updatedUser = await userModel.findOneAndUpdate(
            {_id: user._id},
            {$pull: {cart: {item: id}}},
            {returnDocument: "after"}
        );
        if(updatedUser) {
            res.status(200).json({message: 'product successfully added to user wishlist', user: updatedUser})
        }
    } else {
        res.status(500).json({message: 'error updating user wishlist', user: null});
    }
}