import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Header from '../components/Header';

const ManageSubjects = () => {
  const { courses, getSubjects, addSubject, deleteSubject } = useData();
  const navigate = useNavigate();
  
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedCurriculum, setSelectedCurriculum] = useState('NEP');
  const [subjectForm, setSubjectForm] = useState({ code: '', name: '', credits: 4 });
  
  const subjects = getSubjects(selectedCourse, selectedSemester, selectedCurriculum);

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!selectedCourse) {
      alert('Please select a course first');
      return;
    }
    addSubject(selectedCourse, selectedSemester, selectedCurriculum, subjectForm);
    setSubjectForm({ code: '', name: '', credits: 4 });
  };

  return (
    <>
      <Header />
      <div className="container">
        <button className="btn btn-secondary" onClick={() => navigate('/admin')} style={{ marginBottom: '20px' }}>
          ← Back to Admin Panel
        </button>

        <div className="card">
          <h2 className="card-title">Select Course, Semester & Curriculum</h2>
          <div className="grid">
            <div className="form-group">
              <label className="form-label">Select Course</label>
              <select className="form-select" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="">Choose a course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.code}>{course.name} ({course.code})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Semester</label>
              <select className="form-select" value={selectedSemester} onChange={(e) => setSelectedSemester(parseInt(e.target.value))}>
                {[1,2,3,4,5,6].map(sem => <option key={sem} value={sem}>Semester {sem}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Curriculum</label>
              <select className="form-select" value={selectedCurriculum} onChange={(e) => setSelectedCurriculum(e.target.value)}>
                <option value="NEP">NEP - National Education Policy</option>
                <option value="SEP">SEP - Standard Education Program</option>
              </select>
            </div>
          </div>
        </div>

        {selectedCourse && (
          <div className="card">
            <h2 className="card-title">Add Subject to {selectedCourse} - Semester {selectedSemester} ({selectedCurriculum})</h2>
            <form onSubmit={handleAddSubject}>
              <div className="grid">
                <div className="form-group">
                  <label className="form-label">Subject Code</label>
                  <input type="text" className="form-input" value={subjectForm.code} onChange={(e) => setSubjectForm({...subjectForm, code: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject Name</label>
                  <input type="text" className="form-input" value={subjectForm.name} onChange={(e) => setSubjectForm({...subjectForm, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Credits</label>
                  <input type="number" className="form-input" value={subjectForm.credits} onChange={(e) => setSubjectForm({...subjectForm, credits: parseInt(e.target.value)})} required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Add Subject</button>
            </form>
          </div>
        )}

        {subjects.length > 0 && (
          <div className="card">
            <h2 className="card-title">Subjects for {selectedCourse} - Semester {selectedSemester} ({selectedCurriculum})</h2>
            <table className="table">
              <thead>
                <tr><th>Code</th><th>Subject Name</th><th>Credits</th><th>Action</th></tr>
              </thead>
              <tbody>
                {subjects.map(subject => (
                  <tr key={subject.id}>
                    <td>{subject.code}</td>
                    <td>{subject.name}</td>
                    <td>{subject.credits}</td>
                    <td><button className="btn btn-danger" onClick={() => deleteSubject(selectedCourse, selectedSemester, selectedCurriculum, subject.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageSubjects;