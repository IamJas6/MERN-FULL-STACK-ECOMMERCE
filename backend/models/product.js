const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxlength: 50,
        trim: true
    },
    description: {
        type: String,
        require: true,
        maxlength: 1000,
        trim: true
    },
    image: {
        type: String,
        trim: true,
        default: null
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    quantity: {
        type: Number,
        default: 0
    },
    pricePerQuantity: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)