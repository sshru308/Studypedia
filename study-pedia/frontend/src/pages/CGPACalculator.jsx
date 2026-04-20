import React, { useState } from 'react';
import Header from '../components/Header';

const CGPACalculator = ({ user }) => {
  const [semester, setSemester] = useState(user?.currentSemester || 1);
  const [subjects, setSubjects] = useState([
    { name: 'Subject 1', credits: 4, marks: '', grade: '', gradePoint: 0 },
    { name: 'Subject 2', credits: 4, marks: '', grade: '', gradePoint: 0 },
    { name: 'Subject 3', credits: 3, marks: '', grade: '', gradePoint: 0 },
    { name: 'Subject 4', credits: 3, marks: '', grade: '', gradePoint: 0 },
    { name: 'Subject 5', credits: 2, marks: '', grade: '', gradePoint: 0 }
  ]);
  
  const [sgpa, setSgpa] = useState(null);
  const [cgpa, setCgpa] = useState(null);
  const [allSemesters, setAllSemesters] = useState(() => {
    const saved = localStorage.getItem('studyPedia_semester_grades');
    if (saved) return JSON.parse(saved);
    return {};
  });

  // Grade calculation based on marks
  const calculateGrade = (marks) => {
    const m = parseFloat(marks);
    if (isNaN(m)) return { grade: '', gradePoint: 0 };
    if (m >= 90) return { grade: 'O', gradePoint: 10 };
    if (m >= 80) return { grade: 'A+', gradePoint: 9 };
    if (m >= 70) return { grade: 'A', gradePoint: 8 };
    if (m >= 60) return { grade: 'B+', gradePoint: 7 };
    if (m >= 50) return { grade: 'B', gradePoint: 6 };
    if (m >= 40) return { grade: 'C', gradePoint: 5 };
    return { grade: 'F', gradePoint: 0 };
  };

  const handleMarksChange = (index, marks) => {
    const newSubjects = [...subjects];
    newSubjects[index].marks = marks;
    const { grade, gradePoint } = calculateGrade(marks);
    newSubjects[index].grade = grade;
    newSubjects[index].gradePoint = gradePoint;
    setSubjects(newSubjects);
  };

  const calculateSGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    subjects.forEach(subject => {
      totalCredits += subject.credits;
      totalGradePoints += subject.credits * subject.gradePoint;
    });
    
    const calculatedSgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    setSgpa(calculatedSgpa);
    
    // Save semester result
    const updated = { ...allSemesters, [semester]: { sgpa: calculatedSgpa, subjects: [...subjects] } };
    setAllSemesters(updated);
    localStorage.setItem('studyPedia_semester_grades', JSON.stringify(updated));
    
    // Also calculate CGPA after saving
    calculateCGPA(updated);
  };

  const calculateCGPA = (savedSemesters = null) => {
    const semestersToUse = savedSemesters || allSemesters;
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    Object.keys(semestersToUse).forEach(sem => {
      const semData = semestersToUse[sem];
      if (semData && semData.subjects) {
        semData.subjects.forEach(subject => {
          totalCredits += subject.credits;
          totalGradePoints += subject.credits * subject.gradePoint;
        });
      }
    });
    
    const calculatedCgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    setCgpa(calculatedCgpa);
  };

  const resetForm = () => {
    setSubjects(subjects.map(s => ({ ...s, marks: '', grade: '', gradePoint: 0 })));
    setSgpa(null);
  };

  const getGradeColor = (grade) => {
    if (grade === 'O') return '#28a745';
    if (grade === 'A+') return '#20c997';
    if (grade === 'A') return '#17a2b8';
    if (grade === 'B+') return '#ffc107';
    if (grade === 'B') return '#fd7e14';
    if (grade === 'C') return '#6c757d';
    if (grade === 'F') return '#dc3545';
    return '#6c757d';
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="card" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white' }}>
          <h2>📊 CGPA/SGPA Calculator</h2>
          <p>Calculate your Semester Grade Point Average and Cumulative GPA</p>
        </div>

        <div className="grid">
          {/* SGPA Calculator */}
          <div className="card">
            <h3 className="card-title">📖 Semester GPA (SGPA) Calculator</h3>
            <div className="form-group">
              <label className="form-label">Select Semester</label>
              <select className="form-select" value={semester} onChange={(e) => setSemester(parseInt(e.target.value))}>
                {[1,2,3,4,5,6].map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr><th>Subject</th><th>Credits</th><th>Marks (out of 100)</th><th>Grade</th><th>Grade Point</th></tr>
                </thead>
                <tbody>
                  {subjects.map((subject, idx) => (
                    <tr key={idx}>
                      <td>
                        <input type="text" className="form-input" value={subject.name} onChange={(e) => {
                          const newSubjects = [...subjects];
                          newSubjects[idx].name = e.target.value;
                          setSubjects(newSubjects);
                        }} style={{ width: '120px' }} />
                       </td>
                      <td>
                        <select className="form-select" value={subject.credits} onChange={(e) => {
                          const newSubjects = [...subjects];
                          newSubjects[idx].credits = parseInt(e.target.value);
                          setSubjects(newSubjects);
                        }} style={{ width: '80px' }}>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                        </select>
                       </td>
                      <td>
                        <input type="number" className="form-input" value={subject.marks} onChange={(e) => handleMarksChange(idx, e.target.value)} style={{ width: '100px' }} placeholder="0-100" />
                       </td>
                      <td style={{ color: getGradeColor(subject.grade), fontWeight: 'bold' }}>{subject.grade || '-'}</td>
                      <td>{subject.gradePoint || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn btn-primary" onClick={calculateSGPA}>Calculate SGPA</button>
              <button className="btn btn-secondary" onClick={resetForm}>Reset</button>
            </div>
            
            {sgpa && (
              <div className="alert alert-success" style={{ marginTop: '20px', textAlign: 'center' }}>
                <h3>Your SGPA for Semester {semester}: <strong style={{ fontSize: '2rem', color: '#28a745' }}>{sgpa}</strong></h3>
                <p>Grade: {sgpa >= 9 ? 'Outstanding' : sgpa >= 8 ? 'Excellent' : sgpa >= 7 ? 'Very Good' : sgpa >= 6 ? 'Good' : sgpa >= 5 ? 'Average' : 'Needs Improvement'}</p>
                <p>Percentage: {(sgpa * 9.5).toFixed(2)}%</p>
              </div>
            )}
          </div>

          {/* CGPA Calculator & History */}
          <div className="card">
            <h3 className="card-title">📈 Cumulative GPA (CGPA) Calculator</h3>
            
            <div className="form-group">
              <label className="form-label">Saved Semester Results</label>
              {Object.keys(allSemesters).length === 0 ? (
                <div className="alert alert-info">No saved results. Calculate and save SGPA for each semester first.</div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="table">
                    <thead>
                      <tr><th>Semester</th><th>SGPA</th></tr>
                    </thead>
                    <tbody>
                      {Object.keys(allSemesters).sort().map(sem => (
                        <tr key={sem}>
                          <td>Semester {sem}</td>
                          <td>{allSemesters[sem].sgpa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            <button className="btn btn-primary" onClick={() => calculateCGPA()} style={{ width: '100%' }}>
              Calculate Overall CGPA
            </button>
            
            {cgpa && (
              <div className="alert alert-success" style={{ marginTop: '20px', textAlign: 'center' }}>
                <h3>Your Overall CGPA: <strong style={{ fontSize: '2rem', color: '#28a745' }}>{cgpa}</strong></h3>
                <p>Percentage: {(cgpa * 9.5).toFixed(2)}%</p>
                <p>Class: {cgpa >= 9 ? 'Distinction' : cgpa >= 8 ? 'First Class' : cgpa >= 7 ? 'Second Class' : cgpa >= 6 ? 'Pass Class' : 'Needs Improvement'}</p>
              </div>
            )}
            
            <div className="alert alert-info" style={{ marginTop: '20px' }}>
              <h4>📌 Grade System</h4>
              <ul style={{ marginLeft: '20px', fontSize: '12px' }}>
                <li><strong>O (Outstanding):</strong> 90-100 → 10 points</li>
                <li><strong>A+ (Excellent):</strong> 80-89 → 9 points</li>
                <li><strong>A (Very Good):</strong> 70-79 → 8 points</li>
                <li><strong>B+ (Good):</strong> 60-69 → 7 points</li>
                <li><strong>B (Average):</strong> 50-59 → 6 points</li>
                <li><strong>C (Pass):</strong> 40-49 → 5 points</li>
                <li><strong>F (Fail):</strong> Below 40 → 0 points</li>
              </ul>
              <p style={{ marginTop: '10px' }}><strong>Formula:</strong> SGPA = Σ(Credits × Grade Points) / Σ Credits | CGPA = Average of all SGPA</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CGPACalculator;