import React, { useState } from 'react';
import Header from '../components/Header';

const ViewTimetable = ({ user }) => {
  const [timetables] = useState(() => {
    const saved = localStorage.getItem('studyPedia_timetables');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const myTimetables = timetables.filter(tt => 
    tt.course === user.course && 
    tt.semester === user.currentSemester && 
    tt.curriculum === user.curriculum
  );

  const handleDownload = (id, fileData, fileName) => {
    const updated = timetables.map(tt => 
      tt.id === id ? { ...tt, downloadCount: (tt.downloadCount || 0) + 1 } : tt
    );
    localStorage.setItem('studyPedia_timetables', JSON.stringify(updated));
    
    const link = document.createElement('a');
    link.href = fileData;
    link.download = fileName;
    link.click();
    window.location.reload();
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="card" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white' }}>
          <h2>📅 My Timetable</h2>
          <p>{user.course} - Semester {user.currentSemester} ({user.curriculum})</p>
        </div>

        {myTimetables.length === 0 ? (
          <div className="card">
            <div className="alert alert-info">
              📅 No timetable uploaded yet for your course and semester. Please check back later.
            </div>
          </div>
        ) : (
          <div className="grid">
            {myTimetables.map(tt => (
              <div key={tt.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 className="card-title" style={{ marginBottom: 0 }}>{tt.title}</h3>
                  <span style={{ background: '#28a745', color: 'white', padding: '2px 10px', borderRadius: '20px', fontSize: '12px' }}>
                    Year {tt.academicYear}
                  </span>
                </div>
                
                <p><strong>📅 Uploaded:</strong> {tt.uploadedDate}</p>
                <p><strong>📄 File:</strong> {tt.fileName}</p>
                <p><strong>📥 Downloads:</strong> {tt.downloadCount || 0} times</p>
                
                {tt.description && <p><strong>📝 Note:</strong> {tt.description}</p>}
                
                {tt.fileType && tt.fileType.startsWith('image/') && (
                  <div style={{ margin: '15px 0', textAlign: 'center' }}>
                    <img src={tt.fileData} alt="Timetable Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', border: '1px solid #ddd' }} />
                  </div>
                )}
                
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleDownload(tt.id, tt.fileData, tt.fileName)}
                  style={{ marginTop: '15px', width: '100%' }}
                >
                  📥 Download Timetable
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="card" style={{ background: '#f0f8ff' }}>
          <h3>💡 Timetable Information</h3>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Classes run from Monday to Friday, 9:00 AM to 4:00 PM</li>
            <li>Each lecture duration is 1 hour</li>
            <li>Lunch break: 1:00 PM - 2:00 PM</li>
            <li>Practical sessions are held in respective labs</li>
            <li>Contact your class teacher for any timetable clarifications</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ViewTimetable;