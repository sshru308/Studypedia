const mongoose = require('mongoose');

const LeaveApplicationSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  studentName: String,
  course: String,
  semester: Number,
  leaveType: {
    type: String,
    enum: ['sick', 'casual', 'emergency', 'study', 'other'],
  },
  fromDate: Date,
  toDate: Date,
  reason: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  adminRemarks: String,
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LeaveApplication', LeaveApplicationSchema);