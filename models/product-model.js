const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    images: [
        {
            type:String,
        }
    ],
    name: {
        type: String,
        trim:true
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
    description: {
        type: String,
        trim:true
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