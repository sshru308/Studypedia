import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const AdminPanel = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Manage Courses', icon: '📚', description: 'Add, Edit, or Delete Courses (BCA, BCOM, BSc)', path: '/admin/courses', color: '#1e3c72' },
    { title: 'Manage Subjects', icon: '📖', description: 'Add subjects to specific Course, Semester & Curriculum', path: '/admin/subjects', color: '#2a5298' },
    { title: 'Manage Materials', icon: '📎', description: 'Upload Notes, Books, Exam Papers for Subjects', path: '/admin/materials', color: '#ff6b35' },
    { title: 'Send Memo/Notice', icon: '📢', description: 'Send announcements to all students', path: '/admin/send-memo', color: '#17a2b8' },
    { title: 'Schedule Exams', icon: '📅', description: 'Schedule exams & tests with countdown', path: '/admin/manage-exams', color: '#6f42c1' },
    { title: 'Manage Timetable', icon: '📅', description: 'Upload class timetables (PDF, Images)', path: '/admin/manage-timetable', color: '#fd7e14' },
    { title: 'Manage Leave Apps', icon: '📋', description: 'Approve or Reject student leave requests', path: '/admin/manage-leave', color: '#28a745' },
    { title: 'Manage Alumni', icon: '🌟', description: 'Add successful alumni stories with photos', path: '/admin/manage-alumni', color: '#9b59b6' },
    { title: 'HappyUs Gallery', icon: '📸', description: 'Upload class photos & campus memories', path: '/admin/manage-happyus', color: '#e84393' }
  ];

  return (
    <>
      <Header />
      <div className="container">
        <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white' }}>
          <h1>🔧 Admin Dashboard</h1>
          <p>Manage Courses, Subjects, Study Materials, Notices, Exams, Timetable, Leave, Alumni & Gallery</p>
        </div>

        <div className="grid">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className="card" 
              style={{ cursor: 'pointer', textAlign: 'center', transition: 'transform 0.3s' }}
              onClick={() => navigate(item.path)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{item.icon}</div>
              <h3 style={{ color: item.color }}>{item.title}</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>{item.description}</p>
              <button className="btn btn-primary" style={{ marginTop: '15px' }}>Manage →</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;