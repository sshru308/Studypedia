const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/studypedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.log('❌ MongoDB connection error:', err));

// Import Routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const subjectRoutes = require('./routes/subjects');
const materialRoutes = require('./routes/materials');
const examRoutes = require('./routes/exams');
const leaveRoutes = require('./routes/leave');
const memoRoutes = require('./routes/memos');
const alumniRoutes = require('./routes/alumni');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/memos', memoRoutes);
app.use('/api/alumni', alumniRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'StudyPedia API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});