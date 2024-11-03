const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    name:{
        type: String,
        minLength: 3,
        trim:true
    },
    email: {
        type: String,
        trim:true
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
    password: String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    image: String,
});

module.exports = mongoose.model('owner', ownerSchema);