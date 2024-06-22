const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    ReservationID: {
        type: String,
        required: true
    },
    StudioID: {
        type: String,
        required: true
    },
    RoomID: {
        type: String,
        required: true
    },
    UID: {
        type: String,
        required: true
    },
    ReservationDate: {
        type: Date,
        required: true
    },
    StartTime: {
        type: String,
        required: true
    },
    EndTime: {
        type: String,
        required: true
    },
    TotalCost: {
        type: String,
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('reservations', reservationSchema);