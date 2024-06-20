const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: Date.now
    },
    tel: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('users', usersSchema);