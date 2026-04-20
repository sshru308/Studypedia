const express = require('express');
const router = express.Router();
const LeaveApplication = require('../models/LeaveApplication');
const auth = require('../middleware/auth');

// Apply for leave (Student)
router.post('/', auth, async (req, res) => {
  try {
    const leave = new LeaveApplication(req.body);
    await leave.save();
    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get student's leaves
router.get('/my-leaves', auth, async (req, res) => {
  try {
    const leaves = await LeaveApplication.find({ studentId: req.user.collegeId });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all leaves (Admin only)
router.get('/all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const leaves = await LeaveApplication.find().sort({ appliedDate: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve/Reject leave (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const { status, adminRemarks } = req.body;
    const leave = await LeaveApplication.findByIdAndUpdate(
      req.params.id,
      { status, adminRemarks },
      { new: true }
    );
    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;