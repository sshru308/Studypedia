const mongoose = require('mongoose');

const MemoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['general', 'urgent', 'exam', 'holiday', 'important'],
    default: 'general',
  },
  sentBy: String,
  sentTo: {
    type: String,
    enum: ['all', 'students', 'teachers', 'specific'],
    default: 'all',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Memo', MemoSchema);