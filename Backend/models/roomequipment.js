const mongoose = require('mongoose');

const EquipmentListSchema = new mongoose.Schema({
  EquipmentID: {
    type: String,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  Quantity: {
    type: Number,
    required: true
  }
});

const RoomEquipmentSchema = new mongoose.Schema({
  StudioID: {
    type: String,
    required: true
  },
  RoomID: {
    type: String,
    required: true
  },
  EquipmentList: {
    type: [EquipmentListSchema],
    required: true,
    default: []
  }
});

module.exports = mongoose.model('RoomEquipment', RoomEquipmentSchema);
