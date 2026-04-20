const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: String,
  course: String,
  semester: Number,
  curriculum: String,
  examDate: Date,
  examTime: String,
  duration: String,
  totalMarks: Number,
  venue: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Exam', ExamSchema);