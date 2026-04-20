import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Header from '../components/Header';

const ManageCourses = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useData();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    duration: '3 Years',
    semesters: 6,
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateCourse(isEditing, formData);
    } else {
      addCourse(formData);
    }
    setFormData({ code: '', name: '', duration: '3 Years', semesters: 6, description: '' });
    setIsEditing(null);
  };

  const handleEdit = (course) => {
    setIsEditing(course.id);
    setFormData(course);
  };

  return (
    <>
      <Header />
      <div className="container">
        <button className="btn btn-secondary" onClick={() => navigate('/admin')} style={{ marginBottom: '20px' }}>
          ← Back to Admin Panel
        </button>

        <div className="card">
          <h2 className="card-title">{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid">
              <div className="form-group">
                <label className="form-label">Course Code</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  placeholder="e.g., BCA, BCOM, BSC"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Course Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Bachelor of Computer Applications"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Number of Semesters</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.semesters}
                  onChange={(e) => setFormData({...formData, semesters: parseInt(e.target.value)})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update Course' : 'Add Course'}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-secondary" style={{ marginLeft: '10px' }} onClick={() => {
                setIsEditing(null);
                setFormData({ code: '', name: '', duration: '3 Years', semesters: 6, description: '' });
              }}>
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="card">
          <h2 className="card-title">Existing Courses</h2>
          <div className="grid">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <h3>{course.code} - {course.name}</h3>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Semesters:</strong> {course.semesters}</p>
                <p>{course.description}</p>
                <div style={{ marginTop: '15px' }}>
                  <button className="btn btn-secondary" onClick={() => handleEdit(course)} style={{ marginRight: '10px' }}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteCourse(course.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCourses;