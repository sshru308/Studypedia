import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ManageHappyUs = () => {
  const navigate = useNavigate();
  const [memories, setMemories] = useState(() => {
    const saved = localStorage.getItem('studyPedia_memories');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [formData, setFormData] = useState({
    title: '',
    event: '',
    year: new Date().getFullYear(),
    description: '',
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
    if (!formData.imageData) {
      alert('Please upload a photo');
      return;
    }
    
    const newMemory = {
      id: Date.now(),
      ...formData,
      addedDate: new Date().toLocaleString(),
      views: 0
    };
    setMemories([newMemory, ...memories]);
    localStorage.setItem('studyPedia_memories', JSON.stringify([newMemory, ...memories]));
    alert('✅ Memory added successfully!');
    setFormData({
      title: '',
      event: '',
      year: new Date().getFullYear(),
      description: '',
      imageData: null,
      imageName: ''
    });
  };

  const deleteMemory = (id) => {
    if (window.confirm('Delete this memory?')) {
      const updated = memories.filter(m => m.id !== id);
      setMemories(updated);
      localStorage.setItem('studyPedia_memories', JSON.stringify(updated));
      alert('Memory deleted successfully!');
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
          <h2>📸 HappyUs - Campus Memories</h2>
          <p>Upload class photos, event memories, and campus life moments</p>
        </div>

        <div className="grid">
          <div className="card">
            <h3 className="card-title">➕ Add New Memory</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" className="form-input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g., BCA Batch 2024 Farewell" required />
              </div>
              
              <div className="grid">
                <div className="form-group">
                  <label className="form-label">Event Name</label>
                  <input type="text" className="form-input" value={formData.event} onChange={(e) => setFormData({...formData, event: e.target.value})} placeholder="e.g., Annual Day, Sports Day" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <input type="number" className="form-input" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} required />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" rows="2" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe this memory..." />
              </div>
              
              <div className="form-group">
                <label className="form-label">Upload Photo</label>
                <input type="file" className="form-input" accept="image/*" onChange={handleImageUpload} required />
                {formData.imageName && <small>✅ {formData.imageName} uploaded</small>}
              </div>
              
              <button type="submit" className="btn btn-primary">📸 Add Memory</button>
            </form>
          </div>

          <div className="card">
            <h3 className="card-title">📸 Memories Gallery ({memories.length})</h3>
            {memories.length === 0 ? (
              <div className="alert alert-info">No memories added yet. Upload your first campus photo!</div>
            ) : (
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {memories.map(m => (
                  <div key={m.id} className="course-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4>{m.title}</h4>
                      <button className="btn btn-danger" onClick={() => deleteMemory(m.id)} style={{ padding: '5px 10px' }}>Delete</button>
                    </div>
                    <p><strong>Event:</strong> {m.event} | <strong>Year:</strong> {m.year}</p>
                    <p>{m.description}</p>
                    {m.imageData && (
                      <div style={{ marginTop: '10px' }}>
                        <img src={m.imageData} alt={m.title} style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px' }} />
                      </div>
                    )}
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

export default ManageHappyUs;