const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: String,
    name: {
        tyepe: String,
        trim: true,
    },
    price: Number,
    discount: {
        type: Number,
        default:0
    },
    units: {
        type: Number,
        default:0,
    },
    features: [
        {
            name: {
                type: String,
                trim:true,
            },
            description: {
                type: String,
                trim: true
            }
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'owner',
    },
    dateAdded: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('product', productSchema);