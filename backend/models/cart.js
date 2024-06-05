const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            default: 0
        },
    }],
    totalAmount: Number
},{
    timestamps: true
})

module.exports = mongoose.model('Cart', cartSchema)