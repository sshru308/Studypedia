const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const Subject = require('../models/Subject');

// Get all materials for a subject
router.get('/subject/:subjectId', async (req, res) => {
  try {
    const materials = await Material.find({ subjectId: req.params.subjectId });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search materials by title, author, publisher
router.get('/search', async (req, res) => {
  try {
    const { q, course } = req.query;
    const subjects = await Subject.find({ course });
    const subjectIds = subjects.map(s => s._id);
    
    const materials = await Material.find({
      subjectId: { $in: subjectIds },
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
        { publisher: { $regex: q, $options: 'i' } }
      ]
    });
    
    const results = await Promise.all(materials.map(async (material) => {
      const subject = await Subject.findById(material.subjectId);
      return {
        ...material.toObject(),
        subjectName: subject?.name,
        subjectCode: subject?.code
      };
    }));
    
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add material (Admin only)
router.post('/', async (req, res) => {
  try {
    const material = new Material(req.body);
    await material.save();
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update download count
router.put('/download/:id', async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete material
router.delete('/:id', async (req, res) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.json({ message: 'Material deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;