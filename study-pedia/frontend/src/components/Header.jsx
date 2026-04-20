import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isStudent = user.role === 'student';
  const isAdmin = user.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="logo">
          <h1>📚 StudyPedia</h1>
          <p>Your Academic Companion</p>
        </div>
        <div className="nav">
          <Link to="/" className="nav-link">Home</Link>
          {isStudent ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/profile" className="nav-link">👤 Profile</Link>
              <Link to="/cgpa-calculator" className="nav-link">📊 CGPA</Link>
              <Link to="/timetable" className="nav-link">📅 Timetable</Link>
              <Link to="/apply-leave" className="nav-link">🏖️ Leave</Link>
              <Link to="/exams" className="nav-link">📝 Exams</Link>
              <button onClick={handleLogout} className="nav-link" style={{ background: '#dc3545' }}>Logout</button>
            </>
          ) : isAdmin ? (
            <>
              <Link to="/admin" className="nav-link">Admin Panel</Link>
              <button onClick={handleLogout} className="nav-link" style={{ background: '#dc3545' }}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Student Login</Link>
          )}
          <NotificationBell />
        </div>
      </div>
    </div>
  );
};

export default Header;