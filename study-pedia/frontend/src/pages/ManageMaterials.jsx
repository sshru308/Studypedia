import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Header from '../components/Header';

const ManageMaterials = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [materials, setMaterials] = useState([]);
  const [materialType, setMaterialType] = useState('book');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    year: '',
    link: ''
  });
  const [message, setMessage] = useState('');

  // Fetch courses
  const fetchCourses = useCallback(async () => {
    try {
      const res = await API.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  }, []);

  // Fetch subjects based on selected course
  const fetchSubjects = useCallback(async () => {
    if (!selectedCourse) return;
    try {
      const res = await API.get(`/subjects?course=${selectedCourse}`);
      setSubjects(res.data);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  }, [selectedCourse]);

  // Fetch materials based on selected subject
  const fetchMaterials = useCallback(async () => {
    if (!selectedSubject) return;
    try {
      const res = await API.get(`/materials/subject/${selectedSubject}`);
      setMaterials(res.data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    }
  }, [selectedSubject]);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      await fetchCourses();
    };
    loadData();
  }, [fetchCourses]);

  // Load subjects when course changes
  useEffect(() => {
    const loadSubjects = async () => {
      await fetchSubjects();
    };
    loadSubjects();
  }, [fetchSubjects]);

  // Load materials when subject changes
  useEffect(() => {
    const loadMaterials = async () => {
      await fetchMaterials();
    };
    loadMaterials();
  }, [fetchMaterials]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSubject) {
      alert('Please select a subject first');
      return;
    }

    try {
      await API.post('/materials', {
        ...formData,
        subjectId: selectedSubject,
        type: materialType
      });
      
      setMessage('✅ Material added successfully!');
      setFormData({ title: '', author: '', publisher: '', year: '', link: '' });
      await fetchMaterials();
      
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error adding material:', err);
      alert('Error adding material');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this material?')) {
      try {
        await API.delete(`/materials/${id}`);
        await fetchMaterials();
        alert('Material deleted!');
      } catch (err) {
        console.error('Error deleting material:', err);
        alert('Error deleting material');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <button className="btn btn-secondary" onClick={() => navigate('/admin')}>← Back to Admin Panel</button>

        <div className="card" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white' }}>
          <h2>📚 Upload Study Materials</h2>
          <p>Add books, notes, and exam papers with author, publisher, and PDF links</p>
        </div>

        <div className="grid">
          {/* Selection Section */}
          <div className="card">
            <h3 className="card-title">Step 1: Select Course & Subject</h3>
            <div className="form-group">
              <label className="form-label">Select Course</label>
              <select 
                className="form-select" 
                value={selectedCourse} 
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setSelectedSubject('');
                }}
              >
                <option value="">-- Select Course --</option>
                {courses.map(c => (
                  <option key={c._id} value={c.code}>{c.name} ({c.code})</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Select Subject</label>
              <select 
                className="form-select" 
                value={selectedSubject} 
                onChange={(e) => setSelectedSubject(e.target.value)}
                disabled={!selectedCourse}
              >
                <option value="">-- Select Subject --</option>
                {subjects.map(s => (
                  <option key={s._id} value={s._id}>{s.name} ({s.code}) - Semester {s.semester}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Material Form */}
          <div className="card">
            <h3 className="card-title">Step 2: Upload Material</h3>
            
            <div className="semester-selector">
              <button 
                className={`semester-btn ${materialType === 'book' ? 'active' : ''}`} 
                onClick={() => setMaterialType('book')}
              >
                📚 Book
              </button>
              <button 
                className={`semester-btn ${materialType === 'note' ? 'active' : ''}`} 
                onClick={() => setMaterialType('note')}
              >
                📝 Note
              </button>
              <button 
                className={`semester-btn ${materialType === 'examPaper' ? 'active' : ''}`} 
                onClick={() => setMaterialType('examPaper')}
              >
                📋 Exam Paper
              </button>
            </div>

            {message && <div className="alert alert-success">{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  placeholder="e.g., Python Programming, Semester 1 Notes"
                  required 
                />
              </div>
              
              <div className="grid">
                <div className="form-group">
                  <label className="form-label">Author</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.author} 
                    onChange={(e) => setFormData({...formData, author: e.target.value})} 
                    placeholder="e.g., Reema Thareja" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Publisher</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.publisher} 
                    onChange={(e) => setFormData({...formData, publisher: e.target.value})} 
                    placeholder="e.g., Oxford University Press" 
                  />
                </div>
              </div>
              
              {materialType === 'examPaper' && (
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.year} 
                    onChange={(e) => setFormData({...formData, year: e.target.value})} 
                    placeholder="e.g., 2024" 
                  />
                </div>
              )}
              
              <div className="form-group">
                <label className="form-label">PDF Link / Google Drive URL</label>
                <input 
                  type="url" 
                  className="form-input" 
                  value={formData.link} 
                  onChange={(e) => setFormData({...formData, link: e.target.value})} 
                  placeholder="https://drive.google.com/file/d/xxxxx/view" 
                />
                <small>Paste the shareable link to the PDF document</small>
              </div>
              
              <button type="submit" className="btn btn-primary">
                ➕ Add {materialType === 'book' ? 'Book' : materialType === 'note' ? 'Note' : 'Exam Paper'}
              </button>
            </form>
          </div>
        </div>

        {/* Materials List */}
        {selectedSubject && (
          <div className="card">
            <h3 className="card-title">📋 Uploaded Materials</h3>
            {materials.length === 0 ? (
              <div className="alert alert-info">No materials uploaded for this subject yet.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Publisher</th>
                      <th>Downloads</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map(m => (
                      <tr key={m._id}>
                        <td>{m.type === 'book' ? '📚' : m.type === 'note' ? '📝' : '📋'}</td>
                        <td><strong>{m.title}</strong></td>
                        <td>{m.author || '-'}</td>
                        <td>{m.publisher || '-'}</td>
                        <td>{m.downloadCount || 0}</td>
                        <td>
                          <button className="btn btn-danger" onClick={() => handleDelete(m._id)} style={{ padding: '5px 10px' }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageMaterials;