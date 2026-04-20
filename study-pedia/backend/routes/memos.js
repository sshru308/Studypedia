const express = require('express');
const router = express.Router();
const Memo = require('../models/Memo');
const auth = require('../middleware/auth');

// Get all memos
router.get('/', async (req, res) => {
  try {
    const memos = await Memo.find().sort({ createdAt: -1 });
    res.json(memos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Send memo (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const memo = new Memo(req.body);
    await memo.save();
    res.json(memo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete memo
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    await Memo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Memo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;