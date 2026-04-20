import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ManageTimetable = () => {
  const navigate = useNavigate();
  const [timetables, setTimetables] = useState(() => {
    const saved = localStorage.getItem('studyPedia_timetables');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [formData, setFormData] = useState({
    title: '',
    course: 'BCA',
    semester: 1,
    curriculum: 'NEP',
    academicYear: new Date().getFullYear(),
    description: '',
    fileData: null,
    fileName: '',
    fileType: ''
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          fileData: reader.result,
          fileName: file.name,
          fileType: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fileData) {
      alert('Please upload a timetable file');
      return;
    }
    
    const newTimetable = {
      id: Date.now(),
      ...formData,
      uploadedDate: new Date().toLocaleString(),
      downloadCount: 0
    };
    
    setTimetables([newTimetable, ...timetables]);
    localStorage.setItem('studyPedia_timetables', JSON.stringify([newTimetable, ...timetables]));
    alert('✅ Timetable uploaded successfully!');
    
    setFormData({
      title: '',
      course: 'BCA',
      semester: 1,
      curriculum: 'NEP',
      academicYear: new Date().getFullYear(),
      description: '',
      fileData: null,
      fileName: '',
      fileType: ''
    });
  };

  const deleteTimetable = (id) => {
    if (window.confirm('Delete this timetable?')) {
      const updated = timetables.filter(t => t.id !== id);
      setTimetables(updated);
      localStorage.setItem('studyPedia_timetables', JSON.stringify(updated));
      alert('Timetable deleted successfully!');
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
          <h2>📅 Timetable Manager</h2>
          <p>Upload class timetables for different courses, semesters & curricula</p>
        </div>

        <div className="grid">
          <div className="card">
            <h3 className="card-title">📤 Upload Timetable</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Timetable Title</label>
                <input type="text" className="form-input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g., BCA Semester 3 Timetable" required />
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
              
              <div className="form-group">
                <label className="form-label">Academic Year</label>
                <input type="number" className="form-input" value={formData.academicYear} onChange={(e) => setFormData({...formData, academicYear: e.target.value})} required />
              </div>
              
              <div className="form-group">
                <label className="form-label">Upload Timetable File</label>
                <input type="file" className="form-input" accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls" onChange={handleFileUpload} required />
                <small style={{ color: '#666' }}>Supported formats: PDF, JPG, PNG, Excel</small>
                {formData.fileName && (
                  <div className="alert alert-success" style={{ marginTop: '10px', padding: '8px' }}>
                    📄 {formData.fileName}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea className="form-textarea" rows="2" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Any additional notes about this timetable..." />
              </div>
              
              <button type="submit" className="btn btn-primary">📤 Upload Timetable</button>
            </form>
          </div>

          <div className="card">
            <h3 className="card-title">📋 Uploaded Timetables ({timetables.length})</h3>
            {timetables.length === 0 ? (
              <div className="alert alert-info">No timetables uploaded yet</div>
            ) : (
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {timetables.map(tt => (
                  <div key={tt.id} className="course-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4>{tt.title}</h4>
                      <button className="btn btn-danger" onClick={() => deleteTimetable(tt.id)} style={{ padding: '5px 10px' }}>Delete</button>
                    </div>
                    <p><strong>Course:</strong> {tt.course} | Semester {tt.semester} | {tt.curriculum}</p>
                    <p><strong>Year:</strong> {tt.academicYear}</p>
                    <p><strong>Uploaded:</strong> {tt.uploadedDate}</p>
                    <p><strong>File:</strong> {tt.fileName}</p>
                    <p><strong>Downloads:</strong> {tt.downloadCount} times</p>
                    <a href={tt.fileData} download={tt.fileName} className="btn btn-secondary" style={{ marginTop: '10px', display: 'inline-block' }}>📥 Download Timetable</a>
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

export default ManageTimetable;