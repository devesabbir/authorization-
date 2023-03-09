const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    answer:{
        type:String,
        required:true
    },
    role: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
}) 

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel