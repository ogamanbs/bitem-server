const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim: true,
        minLength: 3,
    },
    image: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    cart: {
        type: Array,
        default:[]
    },
    orders: {
        type: Array,
        default:[]
    },
    contact: {
        type: Number,
        length: 10,
    },
    image: {
        type: String,
    }
});

module.exports = mongoose.model('user', userSchema);