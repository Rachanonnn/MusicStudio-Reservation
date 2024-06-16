const mongoose = require('mongoose');

const RoomListSchema = new mongoose.Schema({
  RoomID: {
    type: String,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  Capacity: {
    type: Number,
    required: true
  },
  HourlyRate: {
    type: Number,
    required: true
  },
  Status: {
    type: String,
    required: true
  }
});

const StudioRoomSchema = new mongoose.Schema({
  StudioID: {
    type: String,
    required: true
  },
  RoomList: {
    type: [RoomListSchema],
    required: true,
    default: []
  }
});

module.exports = mongoose.model('StudioRoom', StudioRoomSchema);
