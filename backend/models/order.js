const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
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
    totalAmount: Number,
    paymentType: {
        type: String,
        enum: ['COD', 'online'],
        default: 'COD'
    },
    firstname: {
        type: String,
        require: true,
        maxlength: 50,
        trim: true
    },
    secondname: {
        type: String,
        maxlength: 50,
        default: null
    },
    address: {
        type: String,
        require: true
    },
    address2: {
        type: String,
        default: null
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    zip: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['Initiated', 'Pending', 'Processing', 'Completed', 'Cancelled'],
        default: 'Initiated'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)