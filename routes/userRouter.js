const express = require('express');
const router = express.Router();
const { registerUser, loginUser, validateUser } =  require('../controllers/userAuthController');

const userModel = require('../models/user-model');

router.get('/', (req, res, next) => {
    res.status(200).send('users');
});

router.post('/create', registerUser);
router.post('/login', loginUser);
router.post('/validate', validateUser);

module.exports = router;