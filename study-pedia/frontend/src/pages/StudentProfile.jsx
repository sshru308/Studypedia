import React, { useState } from 'react';
import Header from '../components/Header';

const StudentProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('studyPedia_profiles');
    if (saved) {
      const profiles = JSON.parse(saved);
      return profiles[user.collegeId] || {
        name: user.name,
        email: '',
        phone: '',
        address: '',
        parentName: '',
        parentPhone: '',
        bloodGroup: '',
        dateOfBirth: '',
        gender: 'Male',
        aadharNumber: ''
      };
    }
    return {
      name: user.name,
      email: '',
      phone: '',
      address: '',
      parentName: '',
      parentPhone: '',
      bloodGroup: '',
      dateOfBirth: '',
      gender: 'Male',
      aadharNumber: ''
    };
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState('');

  const handleProfileUpdate = () => {
    const saved = localStorage.getItem('studyPedia_profiles');
    const profiles = saved ? JSON.parse(saved) : {};
    profiles[user.collegeId] = profile;
    localStorage.setItem('studyPedia_profiles', JSON.stringify(profiles));
    setIsEditing(false);
    alert('✅ Profile updated successfully!');
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage('❌ New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 3) {
      setPasswordMessage('❌ Password must be at least 3 characters');
      return;
    }
    
    // Update student password
    const students = JSON.parse(localStorage.getItem('studyPedia_students') || '{}');
    if (students[user.collegeId] && students[user.collegeId].password === passwordData.currentPassword) {
      students[user.collegeId].password = passwordData.newPassword;
      localStorage.setItem('studyPedia_students', JSON.stringify(students));
      setPasswordMessage('✅ Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      setPasswordMessage('❌ Current password is incorrect!');
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="card" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white' }}>
          <h2>👤 My Profile</h2>
          <p>{user.name} - {user.course} (Semester {user.currentSemester})</p>
        </div>

        <div className="grid">
          {/* Profile Information */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="card-title" style={{ marginBottom: 0 }}>📋 Personal Information</h3>
              {!isEditing ? (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>✏️ Edit Profile</button>
              ) : (
                <div>
                  <button className="btn btn-success" onClick={handleProfileUpdate} style={{ marginRight: '10px' }}>💾 Save</button>
                  <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              )}
            </div>

            <div className="grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                {isEditing ? (
                  <input type="text" className="form-input" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                ) : (
                  <p><strong>{profile.name}</strong></p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">College ID</label>
                <p><strong>{user.collegeId}</strong></p>
              </div>
              <div className="form-group">
                <label className="form-label">Course</label>
                <p><strong>{user.course} - Semester {user.currentSemester}</strong></p>
              </div>
              <div className="form-group">
                <label className="form-label">Curriculum</label>
                <p><strong>{user.curriculum}</strong></p>
              </div>
              <div className="form-group">
                <label className="form-label">Email ID</label>
                {isEditing ? (
                  <input type="email" className="form-input" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} placeholder="Enter email" />
                ) : (
                  <p>{profile.email || 'Not added'}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                {isEditing ? (
                  <input type="tel" className="form-input" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} placeholder="Enter phone number" />
                ) : (
                  <p>{profile.phone || 'Not added'}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                {isEditing ? (
                  <input type="date" className="form-input" value={profile.dateOfBirth} onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})} />
                ) : (
                  <p>{profile.dateOfBirth || 'Not added'}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Gender</label>
                {isEditing ? (
                  <select className="form-select" value={profile.gender} onChange={(e) => setProfile({...profile, gender: e.target.value})}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <p>{profile.gender || 'Not added'}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Blood Group</label>
                {isEditing ? (
                  <select className="form-select" value={profile.bloodGroup} onChange={(e) => setProfile({...profile, bloodGroup: e.target.value})}>
                    <option value="">Select</option>
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                    <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                  </select>
                ) : (
                  <p>{profile.bloodGroup || 'Not added'}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Parent/Guardian Name</label>
                {isEditing ? (
                  <input type="text" className="form-input" value={profile.parentName} onChange={(e) => setProfile({...profile, parentName: e.target.value})} placeholder="Parent name" />
                ) : (
                  <p>{profile.parentName || 'Not added'}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Parent Phone</label>
                {isEditing ? (
                  <input type="tel" className="form-input" value={profile.parentPhone} onChange={(e) => setProfile({...profile, parentPhone: e.target.value})} placeholder="Parent phone" />
                ) : (
                  <p>{profile.parentPhone || 'Not added'}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                {isEditing ? (
                  <textarea className="form-textarea" rows="2" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} placeholder="Enter address" />
                ) : (
                  <p>{profile.address || 'Not added'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Password Change */}
          <div className="card">
            <h3 className="card-title">🔐 Change Password</h3>
            {passwordMessage && (
              <div className={`alert ${passwordMessage.includes('✅') ? 'alert-success' : 'alert-error'}`}>
                {passwordMessage}
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input type="password" className="form-input" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input type="password" className="form-input" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input type="password" className="form-input" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} />
            </div>
            <button className="btn btn-primary" onClick={handlePasswordChange}>Change Password</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;