import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ManageExams = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState(() => {
    const saved = localStorage.getItem('studyPedia_exams');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    course: 'BCA',
    semester: 1,
    curriculum: 'NEP',
    examDate: '',
    examTime: '',
    duration: '2 hours',
    totalMarks: 100,
    venue: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExam = {
      id: Date.now(),
      ...formData,
      status: 'upcoming',
      createdDate: new Date().toLocaleString(),
      notified: false
    };
    setExams([newExam, ...exams]);
    localStorage.setItem('studyPedia_exams', JSON.stringify([newExam, ...exams]));
    alert('✅ Exam scheduled successfully! Students will be notified.');
    setFormData({
      title: '',
      subject: '',
      course: 'BCA',
      semester: 1,
      curriculum: 'NEP',
      examDate: '',
      examTime: '',
      duration: '2 hours',
      totalMarks: 100,
      venue: '',
      description: ''
    });
  };

  const deleteExam = (id) => {
    if (window.confirm('Delete this exam?')) {
      const updated = exams.filter(e => e.id !== id);
      setExams(updated);
      localStorage.setItem('studyPedia_exams', JSON.stringify(updated));
      alert('Exam deleted successfully!');
    }
  };

  const getTodayDate = () => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  };

  return (
    <>
      <Header />
      <div className="container">
        <button className="btn btn-secondary" onClick={() => navigate('/admin')} style={{ marginBottom: '20px' }}>
          ← Back to Admin Panel
        </button>

        <div className="card" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white' }}>
          <h2>📅 Schedule Exams & Tests</h2>
          <p>Schedule semester exams, unit tests, and quizzes for students</p>
        </div>

        <div className="grid">
          {/* Schedule Exam Form */}
          <div className="card">
            <h3 className="card-title">📝 Schedule New Exam</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Exam Title</label>
                <input type="text" className="form-input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g., Semester End Exam, Unit Test 1" required />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input type="text" className="form-input" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="e.g., Programming Fundamentals" required />
              </div>
              <div className="grid">
                <div className="form-group">
                  <label className="form-label">Course</label>
                  <select className="form-select" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})}>
                    <option value="BCA">BCA</option>
                    <option value="BCOM">BCom</option>
                    <option value="BSC">BSc</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Semester</label>
                  <select className="form-select" value={formData.semester} onChange={(e) => setFormData({...formData, semester: parseInt(e.target.value)})}>
                    {[1,2,3,4,5,6].map(s => <option key={s} value={s}>Semester {s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Curriculum</label>
                  <select className="form-select" value={formData.curriculum} onChange={(e) => setFormData({...formData, curriculum: e.target.value})}>
                    <option value="NEP">NEP</option>
                    <option value="SEP">SEP</option>
                  </select>
                </div>
              </div>
              <div className="grid">
                <div className="form-group">
                  <label className="form-label">Exam Date</label>
                  <input type="date" className="form-input" value={formData.examDate} onChange={(e) => setFormData({...formData, examDate: e.target.value})} min={getTodayDate()} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Exam Time</label>
                  <input type="time" className="form-input" value={formData.examTime} onChange={(e) => setFormData({...formData, examTime: e.target.value})} required />
                </div>
              </div>
              <div className="grid">
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <select className="form-select" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})}>
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>3 hours</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Total Marks</label>
                  <input type="number" className="form-input" value={formData.totalMarks} onChange={(e) => setFormData({...formData, totalMarks: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Venue</label>
                <input type="text" className="form-input" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} placeholder="e.g., Main Hall, Room 201" required />
              </div>
              <div className="form-group">
                <label className="form-label">Additional Instructions</label>
                <textarea className="form-textarea" rows="2" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Any special instructions for students..." />
              </div>
              <button type="submit" className="btn btn-primary">📅 Schedule Exam</button>
            </form>
          </div>

          {/* Scheduled Exams List */}
          <div className="card">
            <h3 className="card-title">📋 Scheduled Exams ({exams.length})</h3>
            {exams.length === 0 ? (
              <div className="alert alert-info">No exams scheduled yet</div>
            ) : (
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {exams.map(exam => (
                  <div key={exam.id} className="course-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4>{exam.title}</h4>
                      <button className="btn btn-danger" onClick={() => deleteExam(exam.id)} style={{ padding: '5px 10px' }}>Delete</button>
                    </div>
                    <p><strong>Subject:</strong> {exam.subject}</p>
                    <p><strong>Course:</strong> {exam.course} | Semester {exam.semester} | {exam.curriculum}</p>
                    <p><strong>Date:</strong> {exam.examDate} | <strong>Time:</strong> {exam.examTime}</p>
                    <p><strong>Duration:</strong> {exam.duration} | <strong>Marks:</strong> {exam.totalMarks}</p>
                    <p><strong>Venue:</strong> {exam.venue}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageExams;