const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxlength: 50,
        trim: true
    },
    phno: {
        type: String,
        maxlength: 13,
        trim: true,
        default: null
    },
    email: {
        type: String,
        require: true,
        maxlength: 50,
        trim: true
    },
    pic: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: 0
    },
    pass: {
        type: String,
        require: true,
    }
},{
    timestamps: true
})
module.exports = mongoose.model('User', userSchema)