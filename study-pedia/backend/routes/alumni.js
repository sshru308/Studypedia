const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');
const auth = require('../middleware/auth');

// Get all alumni
router.get('/', async (req, res) => {
  try {
    const alumni = await Alumni.find().sort({ createdAt: -1 });
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add alumni (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const alumni = new Alumni(req.body);
    await alumni.save();
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete alumni
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    await Alumni.findByIdAndDelete(req.params.id);
    res.json({ message: 'Alumni deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;