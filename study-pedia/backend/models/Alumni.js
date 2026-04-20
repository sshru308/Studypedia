const mongoose = require('mongoose');

const AlumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batch: String,
  course: String,
  currentPosition: String,
  company: String,
  achievement: String,
  message: String,
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Alumni', AlumniSchema);