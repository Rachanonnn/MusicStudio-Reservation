const mongoose = require('mongoose');

const StudioSchema = new mongoose.Schema({
  StudioID: {
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
  OpenTime: {
    type: Date,
    required: true
  },
  CloseTime: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Studio', StudioSchema);
