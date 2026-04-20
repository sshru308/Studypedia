import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ManageLeave = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('studyPedia_leave_applications');
    if (saved) return JSON.parse(saved);
    return [];
  });
  const [selectedApp, setSelectedApp] = useState(null);
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    localStorage.setItem('studyPedia_leave_applications', JSON.stringify(applications));
  }, [applications]);

  const handleAction = (id, status) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status, adminRemarks: remarks, processedDate: new Date().toLocaleString() } : app
    ));
    setSelectedApp(null);
    setRemarks('');
    alert(`✅ Application ${status} successfully!`);
  };

  const pendingApps = applications.filter(app => app.status === 'pending');
  const approvedApps = applications.filter(app => app.status === 'approved');
  const rejectedApps = applications.filter(app => app.status === 'rejected');

  return (
    <>
      <Header />
      <div className="container">
        <button className="btn btn-secondary" onClick={() => navigate('/admin')} style={{ marginBottom: '20px' }}>
          ← Back to Admin Panel
        </button>

        <div className="card" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white' }}>
          <h2>📋 Leave Application Manager</h2>
          <p>Review, Approve or Reject student leave requests</p>
        </div>

        {/* Pending Applications */}
        <div className="card">
          <h2 className="card-title">⏳ Pending Applications ({pendingApps.length})</h2>
          {pendingApps.length === 0 ? (
            <div className="alert alert-info">No pending applications to review</div>
          ) : (
            pendingApps.map(app => (
              <div key={app.id} className="course-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <h3>{app.studentName}</h3>
                    <p><strong>ID:</strong> {app.studentId} | <strong>Course:</strong> {app.course} | <strong>Semester:</strong> {app.semester}</p>
                    <p><strong>Leave Type:</strong> <span style={{ background: '#ffc107', padding: '2px 8px', borderRadius: '4px' }}>{app.leaveType.toUpperCase()}</span></p>
                    <p><strong>Duration:</strong> 📅 {app.fromDate} to {app.toDate}</p>
                    <p><strong>Total Days:</strong> {Math.ceil((new Date(app.toDate) - new Date(app.fromDate)) / (1000 * 60 * 60 * 24)) + 1} days</p>
                    <p><strong>Reason:</strong> {app.reason}</p>
                    <p><strong>Applied on:</strong> {app.appliedDate}</p>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    {selectedApp === app.id ? (
                      <div>
                        <textarea 
                          className="form-input" 
                          placeholder="Add remarks (optional)" 
                          rows="3" 
                          value={remarks} 
                          onChange={(e) => setRemarks(e.target.value)} 
                          style={{ width: '250px', marginBottom: '10px' }} 
                        />
                        <div>
                          <button className="btn btn-success" onClick={() => handleAction(app.id, 'approved')} style={{ marginRight: '10px' }}>
                            ✅ Approve
                          </button>
                          <button className="btn btn-danger" onClick={() => handleAction(app.id, 'rejected')}>
                            ❌ Reject
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button className="btn btn-primary" onClick={() => setSelectedApp(app.id)}>
                        📝 Review Application
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Approved Applications */}
        {approvedApps.length > 0 && (
          <div className="card">
            <h2 className="card-title">✅ Approved Applications ({approvedApps.length})</h2>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Days</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedApps.map(app => (
                    <tr key={app.id}>
                      <td>{app.studentName}<br/><small>{app.studentId}</small></td>
                      <td>{app.leaveType}</td>
                      <td>{app.fromDate} to {app.toDate}</td>
                      <td>{Math.ceil((new Date(app.toDate) - new Date(app.fromDate)) / (1000 * 60 * 60 * 24)) + 1}</td>
                      <td>{app.adminRemarks || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Rejected Applications */}
        {rejectedApps.length > 0 && (
          <div className="card">
            <h2 className="card-title">❌ Rejected Applications ({rejectedApps.length})</h2>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Reason for Rejection</th>
                  </tr>
                </thead>
                <tbody>
                  {rejectedApps.map(app => (
                    <tr key={app.id}>
                      <td>{app.studentName}<br/><small>{app.studentId}</small></td>
                      <td>{app.leaveType}</td>
                      <td>{app.fromDate} to {app.toDate}</td>
                      <td>{app.adminRemarks || 'No remarks'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageLeave;