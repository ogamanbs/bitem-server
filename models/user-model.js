const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: 3,
    },
    image: [
        {
            type: String,
        },
    ],
    email: {
        type: String,
        trim:true
    },
    password: {
        type: String,
    },
    contact: {
        type: Number,
        validate: {
            validator: function(v) {
                return v.toString().length === 10;
            },
            message: props => `${props.value} is not a valid 10-digit number!`
        },
    },
    wishlist: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            dateAdded: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
    cart: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            dateAdded: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
    orders: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
            },
            numberOfItems: {
                type: Number,
                default: 1
            },
            isDelivered: {
                type: Boolean,
                default: false,
            },
            paymentCompleted: {
                type: Boolean,
                default: false
            },
            dateAdded: {
                type: Date,
                default: Date.now()
            },
        },
    ],
    purchaseHistory: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            dateAdded: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
});

module.exports = mongoose.model('user', userSchema);