const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  collegeId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
  course: {
    type: String,
    enum: ['BCA', 'BCOM', 'BSC'],
  },
  curriculum: {
    type: String,
    enum: ['NEP', 'SEP'],
  },
  currentSemester: {
    type: Number,
    min: 1,
    max: 6,
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'teacher'],
    default: 'student',
  },
  profile: {
    parentName: String,
    parentPhone: String,
    address: String,
    bloodGroup: String,
    dateOfBirth: Date,
    gender: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);