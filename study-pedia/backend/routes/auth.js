const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register new user (works for both student and admin)
router.post('/register', async (req, res) => {
  try {
    const { collegeId, password, name, course, curriculum, currentSemester, role } = req.body;
    
    let user = await User.findOne({ collegeId });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    user = new User({
      collegeId,
      password,
      name,
      course,
      curriculum,
      currentSemester,
      role: role || 'student', // If role is not provided, default to 'student'
    });
    
    await user.save();
    
    const token = jwt.sign(
      { id: user._id, role: user.role, collegeId: user.collegeId },
      process.env.JWT_SECRET || 'secretkey'
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        collegeId: user.collegeId,
        name: user.name,
        course: user.course,
        curriculum: user.curriculum,
        currentSemester: user.currentSemester,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { collegeId, password } = req.body;
    
    const user = await User.findOne({ collegeId });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user._id, role: user.role, collegeId: user.collegeId },
      process.env.JWT_SECRET || 'secretkey'
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        collegeId: user.collegeId,
        name: user.name,
        course: user.course,
        curriculum: user.curriculum,
        currentSemester: user.currentSemester,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    const user = await User.findById(decoded.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;