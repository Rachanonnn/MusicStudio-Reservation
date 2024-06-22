const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    UID: {
        type: String,
        required: true
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        default: Date.now
    },
    Tel: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('users', usersSchema);