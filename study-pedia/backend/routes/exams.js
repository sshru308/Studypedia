const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const auth = require('../middleware/auth');

// Get exams for student
router.get('/', async (req, res) => {
  try {
    const { course, semester, curriculum } = req.query;
    const filter = {};
    if (course) filter.course = course;
    if (semester) filter.semester = parseInt(semester);
    if (curriculum) filter.curriculum = curriculum;
    
    const exams = await Exam.find(filter).sort({ examDate: 1 });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add exam (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete exam
router.delete('/:id', auth, async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({ message: 'Exam deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;