import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const ExamsDashboard = ({ user }) => {
  const [exams] = useState(() => {
    const saved = localStorage.getItem('studyPedia_exams');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [countdowns, setCountdowns] = useState({});

  // Filter exams for this student's course, semester, curriculum
  const myExams = exams.filter(exam => 
    exam.course === user.course && 
    exam.semester === user.currentSemester && 
    exam.curriculum === user.curriculum
  );

  // Calculate countdown for each exam
  useEffect(() => {
    const intervals = {};
    
    myExams.forEach(exam => {
      intervals[exam.id] = setInterval(() => {
        const examDate = new Date(`${exam.examDate}T${exam.examTime}`);
        const now = new Date();
        const diff = examDate - now;

        if (diff <= 0) {
          setCountdowns(prev => ({ ...prev, [exam.id]: 'Exam Started!' }));
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (86400000)) / (3600000));
          const minutes = Math.floor((diff % 3600000) / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          
          setCountdowns(prev => ({ 
            ...prev, 
            [exam.id]: { days, hours, minutes, seconds }
          }));
        }
      }, 1000);
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [myExams]);

  const getStatusColor = (examDate, examTime) => {
    const examDateTime = new Date(`${examDate}T${examTime}`);
    const now = new Date();
    const diff = examDateTime - now;
    
    if (diff < 0) return '#dc3545';
    if (diff < 3 * 24 * 60 * 60 * 1000) return '#ffc107';
    return '#28a745';
  };

  const upcomingExams = myExams.filter(exam => new Date(`${exam.examDate}T${exam.examTime}`) > new Date());
  const pastExams = myExams.filter(exam => new Date(`${exam.examDate}T${exam.examTime}`) <= new Date());

  return (
    <>
      <Header />
      <div className="container">
        <div className="card" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white' }}>
          <h2>📅 Exam Dashboard</h2>
          <p>Upcoming exams, tests, and countdown timers</p>
        </div>

        {/* Stats Summary */}
        <div className="grid">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>📝</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3c72' }}>{upcomingExams.length}</div>
            <div>Upcoming Exams</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>✅</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3c72' }}>{pastExams.length}</div>
            <div>Completed Exams</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>⏰</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3c72' }}>{upcomingExams.length > 0 ? upcomingExams[0]?.title : '-'}</div>
            <div>Next Exam</div>
          </div>
        </div>

        {/* Upcoming Exams with Countdown */}
        <div className="card">
          <h2 className="card-title">⏳ Upcoming Exams & Tests</h2>
          {upcomingExams.length === 0 ? (
            <div className="alert alert-info">No upcoming exams scheduled. Stay tuned!</div>
          ) : (
            <div className="grid">
              {upcomingExams.map(exam => {
                const countdown = countdowns[exam.id];
                const isUrgent = new Date(`${exam.examDate}T${exam.examTime}`) - new Date() < 3 * 24 * 60 * 60 * 1000;
                
                return (
                  <div key={exam.id} className="course-card" style={{ borderLeftColor: getStatusColor(exam.examDate, exam.examTime) }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3>{exam.title}</h3>
                      {isUrgent && <span style={{ background: '#dc3545', color: 'white', padding: '2px 10px', borderRadius: '20px', fontSize: '12px' }}>🔴 URGENT</span>}
                    </div>
                    <p><strong>📖 Subject:</strong> {exam.subject}</p>
                    <p><strong>📅 Date:</strong> {exam.examDate} | <strong>⏰ Time:</strong> {exam.examTime}</p>
                    <p><strong>⏱️ Duration:</strong> {exam.duration} | <strong>📊 Marks:</strong> {exam.totalMarks}</p>
                    <p><strong>📍 Venue:</strong> {exam.venue}</p>
                    
                    {/* Countdown Timer */}
                    <div style={{ 
                      background: isUrgent ? '#fff3cd' : '#e8f5e9', 
                      padding: '15px', 
                      borderRadius: '8px', 
                      marginTop: '15px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                        {isUrgent ? '⚠️ Exam Starts In:' : 'Time Remaining:'}
                      </div>
                      {countdown && typeof countdown === 'object' ? (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '14px' }}>
                          <div><strong>{countdown.days}</strong><br/>Days</div>
                          <div><strong>{countdown.hours}</strong><br/>Hours</div>
                          <div><strong>{countdown.minutes}</strong><br/>Mins</div>
                          <div><strong>{countdown.seconds}</strong><br/>Secs</div>
                        </div>
                      ) : (
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#dc3545' }}>⏰ Exam Started!</div>
                      )}
                    </div>
                    
                    {exam.description && <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}><strong>Note:</strong> {exam.description}</p>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Past Exams */}
        {pastExams.length > 0 && (
          <div className="card">
            <h2 className="card-title">✅ Completed Exams</h2>
            <div className="grid">
              {pastExams.map(exam => (
                <div key={exam.id} className="course-card" style={{ opacity: 0.7 }}>
                  <h3>{exam.title}</h3>
                  <p><strong>Subject:</strong> {exam.subject}</p>
                  <p><strong>Date:</strong> {exam.examDate}</p>
                  <p><strong>Venue:</strong> {exam.venue}</p>
                  <span style={{ background: '#28a745', color: 'white', padding: '2px 10px', borderRadius: '20px', fontSize: '12px', display: 'inline-block' }}>✅ Completed</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ExamsDashboard;