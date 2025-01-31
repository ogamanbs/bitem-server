const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, addToWishlist, removeFromWishlist, getWishlist, getCartItems, addToCart, removeFromCart } =  require('../controllers/userAuthController');

const userModel = require('../models/user-model');

router.get('/', (req, res, next) => {
    res.status(200).send('users');
});

router.post('/create', registerUser);
router.post('/login', loginUser);
router.post('/get-user', getUser);
router.post('/update/wishlist/add', addToWishlist);
router.post('/update/wishlist/remove', removeFromWishlist);
router.post('/wishlist', getWishlist);
router.post('/cart-items', getCartItems);
router.post('/update/cart/add', addToCart);
router.post('/update/cart/remove', removeFromCart);

module.exports = router;