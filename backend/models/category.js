const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxlength: 50,
        trim: true
    },
    logo: {
        type: String,
        trim: true,
        default: null
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Category', categorySchema)