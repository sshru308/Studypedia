import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../contexts/NotificationContext';
import Header from '../components/Header';

const SendMemo = () => {
  const navigate = useNavigate();
  const { notifications, addNotification, deleteNotification, deleteAllNotifications } = useNotifications();
  const [memo, setMemo] = useState({
    title: '',
    message: '',
    type: 'general'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!memo.title || !memo.message) {
      alert('Please fill both title and message');
      return;
    }
    addNotification(memo);
    setMemo({ title: '', message: '', type: 'general' });
    alert('✅ Memo sent successfully to all students!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this memo?')) {
      deleteNotification(id);
      alert('Memo deleted successfully!');
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete ALL memos? This cannot be undone!')) {
      deleteAllNotifications();
      alert('All memos deleted successfully!');
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <button className="btn btn-secondary" onClick={() => navigate('/admin')} style={{ marginBottom: '20px' }}>
          ← Back to Admin Panel
        </button>

        {/* Send Memo Form */}
        <div className="card">
          <h2 className="card-title">📢 Send New Memo/Notice</h2>
          <p style={{ marginBottom: '20px', color: '#666' }}>Send important announcements to all students. Memos will be saved with date & time.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Memo Type</label>
              <select 
                className="form-select" 
                value={memo.type} 
                onChange={(e) => setMemo({...memo, type: e.target.value})}
              >
                <option value="general">📢 General Notice</option>
                <option value="urgent">🔴 Urgent</option>
                <option value="exam">📝 Exam Related</option>
                <option value="holiday">🎉 Holiday/Event</option>
                <option value="important">⚠️ Important</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-input"
                value={memo.title}
                onChange={(e) => setMemo({...memo, title: e.target.value})}
                placeholder="e.g., Semester Exam Notification"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                rows="4"
                value={memo.message}
                onChange={(e) => setMemo({...memo, message: e.target.value})}
                placeholder="Write detailed message here..."
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary">📤 Send Memo to All Students</button>
          </form>
        </div>

        {/* All Sent Memos */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 className="card-title" style={{ marginBottom: 0 }}>📋 All Sent Memos</h2>
            {notifications.length > 0 && (
              <button className="btn btn-danger" onClick={handleDeleteAll} style={{ padding: '5px 15px' }}>
                Delete All
              </button>
            )}
          </div>
          
          {notifications.length === 0 ? (
            <div className="alert alert-info">No memos sent yet. Send your first memo above!</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Title</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map(notif => (
                    <tr key={notif.id}>
                      <td>
                        <span style={{
                          background: notif.type === 'urgent' ? '#dc3545' :
                                     notif.type === 'exam' ? '#ff6b35' :
                                     notif.type === 'holiday' ? '#28a745' :
                                     notif.type === 'important' ? '#ffc107' : '#1e3c72',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          display: 'inline-block'
                        }}>
                          {notif.type.toUpperCase()}
                        </span>
                      </td>
                      <td><strong>{notif.title}</strong></td>
                      <td>{notif.message.length > 50 ? notif.message.substring(0, 50) + '...' : notif.message}</td>
                      <td>{notif.date}</td>
                      <td>{notif.time}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(notif.id)} style={{ padding: '5px 10px' }}>
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
      </div>
    </>
  );
};

export default SendMemo;