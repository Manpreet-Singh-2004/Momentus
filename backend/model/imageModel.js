const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,    
  },
  originalName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
});

module.exports = mongoose.model('Image', ImageSchema);
