const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;