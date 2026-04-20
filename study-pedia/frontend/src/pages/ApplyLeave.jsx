import React, { useState } from 'react';
import Header from '../components/Header';

const ApplyLeave = ({ user }) => {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('studyPedia_leave_applications');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    reason: '',
    leaveType: 'sick'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApplication = {
      id: Date.now(),
      studentId: user.collegeId,
      studentName: user.name,
      course: user.course,
      semester: user.currentSemester,
      ...formData,
      status: 'pending',
      appliedDate: new Date().toLocaleString(),
      adminRemarks: ''
    };
    setApplications([newApplication, ...applications]);
    localStorage.setItem('studyPedia_leave_applications', JSON.stringify([newApplication, ...applications]));
    alert('✅ Leave application submitted successfully!');
    setFormData({ fromDate: '', toDate: '', reason: '', leaveType: 'sick' });
  };

  const myApplications = applications.filter(app => app.studentId === user.collegeId);

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return '#28a745';
      case 'rejected': return '#dc3545';
      default: return '#ffc107';
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="card" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white' }}>
          <h2>🏖️ Holiday/Leave Application</h2>
          <p>Apply for leave or holiday request</p>
        </div>

        <div className="grid">
          {/* Application Form */}
          <div className="card">
            <h3 className="card-title">📝 Apply for Leave</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Leave Type</label>
                <select className="form-select" value={formData.leaveType} onChange={(e) => setFormData({...formData, leaveType: e.target.value})}>
                  <option value="sick">🤒 Sick Leave</option>
                  <option value="casual">🏡 Casual Leave</option>
                  <option value="emergency">🚨 Emergency Leave</option>
                  <option value="study">📚 Study Leave</option>
                  <option value="other">📝 Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">From Date</label>
                <input type="date" className="form-input" value={formData.fromDate} onChange={(e) => setFormData({...formData, fromDate: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">To Date</label>
                <input type="date" className="form-input" value={formData.toDate} onChange={(e) => setFormData({...formData, toDate: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Reason</label>
                <textarea className="form-textarea" rows="4" value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} placeholder="Please provide detailed reason for leave..." required />
              </div>
              <button type="submit" className="btn btn-primary">Submit Application</button>
            </form>
          </div>

          {/* My Applications */}
          <div className="card">
            <h3 className="card-title">📋 My Applications</h3>
            {myApplications.length === 0 ? (
              <div className="alert alert-info">No applications submitted yet.</div>
            ) : (
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {myApplications.map(app => (
                  <div key={app.id} className="course-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ background: getStatusColor(app.status), color: 'white', padding: '2px 10px', borderRadius: '20px', fontSize: '12px' }}>
                        {app.status.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '12px', color: '#666' }}>{app.appliedDate}</span>
                    </div>
                    <p><strong>Type:</strong> {app.leaveType.toUpperCase()}</p>
                    <p><strong>Duration:</strong> {app.fromDate} to {app.toDate}</p>
                    <p><strong>Reason:</strong> {app.reason}</p>
                    {app.adminRemarks && <p><strong>Admin Remarks:</strong> {app.adminRemarks}</p>}
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

export default ApplyLeave;