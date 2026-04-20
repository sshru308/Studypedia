import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Header from '../components/Header';

const StudentDashboard = ({ user }) => {
  const navigate = useNavigate();
  const { getSubjects, getMaterials } = useData(); // Removed 'courses' as it wasn't used
  const [selectedSemester, setSelectedSemester] = useState(user.currentSemester || 1);
  const [selectedCurriculum, setSelectedCurriculum] = useState(user.curriculum || 'NEP');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchType, setSearchType] = useState('all'); // all, books, authors

  const subjects_list = getSubjects(user.course, selectedSemester, selectedCurriculum);
  const allSemesters = [1, 2, 3, 4, 5, 6];

  // Search function for books
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert('Please enter a search term (book name, author, or subject)');
      return;
    }

    const results = [];
    const term = searchTerm.toLowerCase();

    // Search through all subjects across all semesters and curricula
    const allCurriculums = ['NEP', 'SEP'];
    const allSem = [1, 2, 3, 4, 5, 6];

    allCurriculums.forEach(curr => {
      allSem.forEach(sem => {
        const semSubjects = getSubjects(user.course, sem, curr);
        semSubjects.forEach(subject => {
          const books = getMaterials(subject.id, 'books');
          books.forEach(book => {
            if (searchType === 'all') {
              if (book.title.toLowerCase().includes(term) || 
                  book.author.toLowerCase().includes(term) ||
                  subject.name.toLowerCase().includes(term)) {
                results.push({
                  ...book,
                  subjectName: subject.name,
                  subjectCode: subject.code,
                  semester: sem,
                  curriculum: curr
                });
              }
            } else if (searchType === 'books' && book.title.toLowerCase().includes(term)) {
              results.push({
                ...book,
                subjectName: subject.name,
                subjectCode: subject.code,
                semester: sem,
                curriculum: curr
              });
            } else if (searchType === 'authors' && book.author.toLowerCase().includes(term)) {
              results.push({
                ...book,
                subjectName: subject.name,
                subjectCode: subject.code,
                semester: sem,
                curriculum: curr
              });
            }
          });
        });
      });
    });

    setSearchResults(results);
    setShowSearch(true);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowSearch(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('studyPedia_currentUser');
    navigate('/login');
    window.location.reload();
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* Welcome Card */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white' }}>
          <h2>Welcome, {user.name}! 🎓</h2>
          <p>College ID: {user.collegeId} | Course: {user.course}</p>
          <p>Curriculum: {selectedCurriculum} | Current Semester: {user.currentSemester}</p>
        </div>

        {/* Search Section - VISIBLE NOW */}
        <div className="card">
          <h3 className="card-title">🔍 Search Books by Subject, Title or Author</h3>
          <div className="form-group">
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <select 
                className="form-select" 
                value={searchType} 
                onChange={(e) => setSearchType(e.target.value)}
                style={{ width: '150px' }}
              >
                <option value="all">All (Books/Authors)</option>
                <option value="books">Book Titles</option>
                <option value="authors">Authors</option>
              </select>
              <input
                type="text"
                className="form-input"
                placeholder={searchType === 'all' ? "Search by book name, author, or subject..." : searchType === 'books' ? "Search by book title..." : "Search by author name..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1, minWidth: '200px' }}
              />
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
              {showSearch && (
                <button className="btn btn-secondary" onClick={clearSearch}>
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Search Results */}
          {showSearch && (
            <div style={{ marginTop: '20px' }}>
              <h4>📖 Search Results ({searchResults.length} found)</h4>
              {searchResults.length > 0 ? (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {searchResults.map((result, idx) => (
                    <div key={idx} className="course-card">
                      <div className="course-name">📚 {result.title}</div>
                      <div>✍️ <strong>Author:</strong> {result.author}</div>
                      <div>📖 <strong>Subject:</strong> {result.subjectName} ({result.subjectCode})</div>
                      <div>📅 <strong>Semester:</strong> {result.semester} | <strong>Curriculum:</strong> {result.curriculum}</div>
                      {result.link && (
                        <a href={result.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ marginTop: '10px', display: 'inline-block' }}>
                          📥 View/Download Book
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info">No books found matching "{searchTerm}". Try different keywords!</div>
              )}
            </div>
          )}
        </div>

        {/* Curriculum Selector */}
        <div className="card">
          <h3 className="card-title">📚 Curriculum Selection</h3>
          <div className="semester-selector">
            <button 
              className={`semester-btn ${selectedCurriculum === 'NEP' ? 'active' : ''}`}
              onClick={() => {
                setSelectedCurriculum('NEP');
                setSelectedSubject(null);
              }}
            >
              NEP - National Education Policy
            </button>
            <button 
              className={`semester-btn ${selectedCurriculum === 'SEP' ? 'active' : ''}`}
              onClick={() => {
                setSelectedCurriculum('SEP');
                setSelectedSubject(null);
              }}
            >
              SEP - Standard Education Program
            </button>
          </div>
        </div>

        {/* Semester Selector */}
        <div className="card">
          <h3 className="card-title">📖 Select Semester</h3>
          <div className="semester-selector">
            {allSemesters.map(sem => (
              <button
                key={sem}
                className={`semester-btn ${selectedSemester === sem ? 'active' : ''}`}
                onClick={() => {
                  setSelectedSemester(sem);
                  setSelectedSubject(null);
                }}
              >
                Semester {sem}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects List */}
        <div className="card">
          <h3 className="card-title">
            {user.course} - Semester {selectedSemester} ({selectedCurriculum}) Subjects
          </h3>
          {subjects_list.length > 0 ? (
            <div className="grid">
              {subjects_list.map(subject => (
                <div 
                  key={subject.id} 
                  className="course-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedSubject(selectedSubject?.id === subject.id ? null : subject)}
                >
                  <div className="course-code">{subject.code}</div>
                  <div className="course-name">{subject.name}</div>
                  <div className="course-credits">Credits: {subject.credits}</div>
                  
                  {selectedSubject?.id === subject.id && (
                    <SubjectMaterials subjectId={subject.id} getMaterials={getMaterials} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              No subjects added yet for this semester. Contact admin to add subjects.
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

// Component to display materials for a subject
const SubjectMaterials = ({ subjectId, getMaterials }) => {
  const books = getMaterials(subjectId, 'books');
  const notes = getMaterials(subjectId, 'notes');
  const examPapers = getMaterials(subjectId, 'examPapers');

  return (
    <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
      {/* Books Section */}
      {books.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#1e3c72' }}>📚 Recommended Books</h4>
          {books.map(book => (
            <div key={book.id} style={{ marginBottom: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>
              <strong>{book.title}</strong>
              <div>✍️ Author: {book.author}</div>
              {book.link && (
                <a href={book.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ marginTop: '5px', fontSize: '0.8rem', display: 'inline-block' }}>
                  📥 View/Download
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Notes Section */}
      {notes.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#1e3c72' }}>📝 Study Notes</h4>
          {notes.map(note => (
            <div key={note.id} style={{ marginBottom: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>
              {note.title}
              {note.link && (
                <a href={note.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ marginLeft: '10px', fontSize: '0.8rem' }}>
                  📄 Download
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Exam Papers Section */}
      {examPapers.length > 0 && (
        <div>
          <h4 style={{ color: '#1e3c72' }}>📋 Previous Year Question Papers</h4>
          {examPapers.map(paper => (
            <div key={paper.id} style={{ marginBottom: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>
              <strong>{paper.title}</strong>
              <div>📅 Year: {paper.year || 'N/A'}</div>
              {paper.link && (
                <a href={paper.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '5px', fontSize: '0.8rem', display: 'inline-block' }}>
                  📥 Download Question Paper
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {books.length === 0 && notes.length === 0 && examPapers.length === 0 && (
        <p className="alert alert-info">No materials uploaded yet for this subject.</p>
      )}
    </div>
  );
};

export default StudentDashboard;