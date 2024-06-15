const mongoose = require('mongoose');

const StudioSchema = new mongoose.Schema({
    StudioID : {
        type: String,
        required: true
    },
    StudioName: {
        type: String,
        required: true
    },
    StudioAddress: {
        type: String,
        required: true
    },
    StudioRoom: {
        type: [StudioRoomSchema],
        required: true
    },
    OpenTime: {
        type: Date,
        required: true
    },
    CloseTime: {
        type: Date,
        required: true
    },
})

const StudioRoomSchema = new mongoose.Schema({
    RoomID: {
        type: String,
        required: true
    },
    RoomName: {
        type: String,
        required: true
    },
    HourlyRate: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    Equipment: {
        type: [EquipmentListSchema],
        required: true
    },
})

const EquipmentListSchema = new mongoose.Schema({
    EquipmentID: {
        type: String,
        required: true
    },
    EquipmentName: {
        type: String,
        required: true
    },
    EquipmentQuantity: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Studio', StudioSchema)