import React, { useState } from 'react';import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ManageAlumni = () => {
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState(() => {
    const saved = localStorage.getItem('studyPedia_alumni');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    course: 'BCA',
    currentPosition: '',
    company: '',
    achievement: '',
    message: '',
    imageData: null,
    imageName: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageData: reader.result,
          imageName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAlumni = {
      id: Date.now(),
      ...formData,
      addedDate: new Date().toLocaleString()
    };
    setAlumni([newAlumni, ...alumni]);
    localStorage.setItem('studyPedia_alumni', JSON.stringify([newAlumni, ...alumni]));
    alert('✅ Alumni added successfully!');
    setFormData({
      name: '',
      batch: '',
      course: 'BCA',
      currentPosition: '',
      company: '',
      achievement: '',
      message: '',
      imageData: null,
      imageName: ''
    });
  };

  const deleteAlumni = (id) => {
    if (window.confirm('Delete this alumni record?')) {
      const updated = alumni.filter(a => a.id !== id);
      setAlumni(updated);
      localStorage.setItem('studyPedia_alumni', JSON.stringify(updated));
      alert('Alumni deleted successfully!');
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <button className="btn btn-secondary" onClick={() => navigate('/admin')} style={{ marginBottom: '20px' }}>
          ← Back to Admin Panel
        </button>

        <div className="card" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white' }}>
          <h2>🌟 Manage Alumni</h2>
          <p>Add successful alumni stories to inspire current students</p>
        </div>

        <div className="grid">
          <div className="card">
            <h3 className="card-title">➕ Add New Alumni</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              
              <div className="grid">
                <div className="form-group">
                  <label className="form-label">Batch Year</label>
                  <input type="text" className="form-input" value={formData.batch} onChange={(e) => setFormData({...formData, batch: e.target.value})} placeholder="e.g., 2020-2023" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Course</label>
                  <select className="form-select" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})}>
                    <option value="BCA">BCA</option>
                    <option value="BCOM">BCom</option>
                    <option value="BSC">BSc</option>
                  </select>
                </div>
              </div>
              
              <div className="grid">
                <div className="form-group">
                  <label className="form-label">Current Position</label>
                  <input type="text" className="form-input" value={formData.currentPosition} onChange={(e) => setFormData({...formData, currentPosition: e.target.value})} placeholder="e.g., Software Engineer" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Company/Organization</label>
                  <input type="text" className="form-input" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} placeholder="e.g., Google, Microsoft" required />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Key Achievement</label>
                <input type="text" className="form-input" value={formData.achievement} onChange={(e) => setFormData({...formData, achievement: e.target.value})} placeholder="e.g., University Rank Holder, Best Project Award" />
              </div>
              
              <div className="form-group">
                <label className="form-label">Message/Success Story</label>
                <textarea className="form-textarea" rows="3" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Share their success story or message to current students..." />
              </div>
              
              <div className="form-group">
                <label className="form-label">Upload Photo (Optional)</label>
                <input type="file" className="form-input" accept="image/*" onChange={handleImageUpload} />
                {formData.imageName && <small>✅ {formData.imageName} uploaded</small>}
              </div>
              
              <button type="submit" className="btn btn-primary">🌟 Add Alumni</button>
            </form>
          </div>

          <div className="card">
            <h3 className="card-title">📋 Alumni List ({alumni.length})</h3>
            {alumni.length === 0 ? (
              <div className="alert alert-info">No alumni added yet. Add your first alumni!</div>
            ) : (
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {alumni.map(a => (
                  <div key={a.id} className="course-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4>{a.name}</h4>
                      <button className="btn btn-danger" onClick={() => deleteAlumni(a.id)} style={{ padding: '5px 10px' }}>Delete</button>
                    </div>
                    <p><strong>Batch:</strong> {a.batch} | <strong>Course:</strong> {a.course}</p>
                    <p><strong>Position:</strong> {a.currentPosition} @ {a.company}</p>
                    <p><strong>Achievement:</strong> {a.achievement}</p>
                    <p><strong>Message:</strong> {a.message}</p>
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

export default ManageAlumni;