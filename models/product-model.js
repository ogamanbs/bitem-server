const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default:0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'owner',
    }
});

module.exports = mongoose.model('product', productSchema);