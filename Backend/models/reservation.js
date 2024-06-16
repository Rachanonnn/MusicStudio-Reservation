const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    reservationid: {
        type: String,
        required: true
    },
    studio_id: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    reservation_date: {
        type: Date,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    total_cost: {
        type: String,
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('reservations', reservationSchema);