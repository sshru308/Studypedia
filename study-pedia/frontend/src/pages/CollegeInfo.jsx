import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CollegeInfo = () => {
  const navigate = useNavigate();
  
  // Load college info from localStorage or use default
  const [collegeInfo] = useState(() => {
    const saved = localStorage.getItem('studyPedia_collegeInfo');
    if (saved) return JSON.parse(saved);
    return {
      name: "Dr. T. Thimmaiah College Of Degree and Management Studies",
      shortName: "DTT College",
      location: "Oorgaum, K.G.F - 563120, Karnataka",
      established: 1962,
      accreditation: "NAAC B' Grade",
      principal: "Mrs. Sujatha",
      contact: "8153260383",
      website: "https://share.google/0W5aVBEi8jWPSuHgC",
      email: "dttcollege@kgf.edu",
      
      vision: `To impart quality education by utilizing available local resources so as to meet the global needs.
To create the right ambience for staff and students to achieve academic and professional growth.
To develop innovative practices in teaching methodology in order to encourage students to develop a spirit of inquiry and a scientific temperament.
To provide quality higher education at an affordable cost.`,
      
      mission: `Imparting higher education for the first time in the history of KGF, Especially for the children of the Gold Miners.
Uplifting and empowering the youth from this locality who are mainly SC/ST and economically backward class with rural back ground.
Maintaining quality in education to achieve highest order of excellence in learning and personality development.
In the pursuit of our vision we commit ourselves to:
• STUDENT CENTERED EDUCATION
• EXCELLENCE IN LEARNING
• BUILDING LEADERSHIP QUALITIES
• PERSONALITY DEVELOPMENT`,
      
      quotes: [
        "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
        "Your attitude, not your aptitude, will determine your altitude. - Zig Ziglar"
      ],
      
      departments: [
        { name: "Computer Science Department", courses: ["BCA", "M.Com (Computer Applications)"] },
        { name: "Commerce Department", courses: ["BCom"] },
        { name: "Science Department", courses: ["BSc Physics, Chemistry & Mathematics", "BSc Chemistry, Botany & Zoology"] }
      ],
      
      courses: [
        { name: "BCA - Bachelor of Computer Applications", type: "Unaided", duration: "3 Years", seats: 60, description: "Computer Applications, Programming, Web Development" },
        { name: "BCom - Bachelor of Commerce", type: "Aided", duration: "3 Years", seats: 120, description: "Commerce, Accounting, Business Studies" },
        { name: "BSc - Physics, Chemistry & Mathematics", type: "Aided", duration: "3 Years", seats: 60, description: "Pure Sciences with PCM combination" },
        { name: "BSc - Chemistry, Botany & Zoology", type: "Aided", duration: "3 Years", seats: 60, description: "Life Sciences with CBZ combination" },
        { name: "MCom - Master of Commerce", type: "Unaided", duration: "2 Years", seats: 40, description: "Post Graduation in Commerce" }
      ],
      
      facilities: [
        { name: "📚 Library", description: "Well-stocked library with thousands of books, journals, and digital resources" },
        { name: "🔬 Laboratories", description: "Modern science and computer labs with latest equipment" },
        { name: "🏃 Sports", description: "Sports facilities for cricket, volleyball, basketball, and indoor games" },
        { name: "🍽️ Canteen", description: "Hygienic canteen providing nutritious food at affordable prices" }
      ],
      
      history: "Dr. T. Thimmaiah College Of Degree and Management Studies was established in 1962, marking the first time higher education was brought to the Kolar Gold Fields (KGF) region. The college was founded with a noble mission to serve the children of gold miners and the local community, particularly focusing on SC/ST and economically backward students from rural backgrounds."
    };
  });

  // Load REAL alumni and memories from localStorage
  const [alumni, setAlumni] = useState([]);
  const [memories, setMemories] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      const savedAlumni = localStorage.getItem('studyPedia_alumni');
      if (savedAlumni) {
        setAlumni(JSON.parse(savedAlumni));
      }
      
      const savedMemories = localStorage.getItem('studyPedia_memories');
      if (savedMemories) {
        setMemories(JSON.parse(savedMemories));
      }
    };
    
    loadData();
    
    // Listen for changes
    const handleStorageChange = () => {
      loadData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Random quote for footer
  const [currentQuote, setCurrentQuote] = useState(collegeInfo.quotes[0]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * collegeInfo.quotes.length);
      setCurrentQuote(collegeInfo.quotes[randomIndex]);
    }, 8000);
    return () => clearInterval(interval);
  }, [collegeInfo.quotes]);

  return (
    <>
      <Header />
      
      {/* Hero Section with College Name and Logo */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{ 
              width: '130px', 
              height: '130px', 
              background: 'white', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              animation: 'pulse 2s infinite'
            }}>
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 15 L15 35 L50 55 L85 35 L50 15Z" fill="#1e3c72" stroke="#ff6b35" strokeWidth="2"/>
                <rect x="45" y="52" width="10" height="20" fill="#1e3c72"/>
                <path d="M35 70 L35 80 L65 80 L65 70" stroke="#1e3c72" strokeWidth="3" fill="none"/>
                <path d="M35 45 L35 65 L50 60 L65 65 L65 45 L50 40 L35 45Z" fill="#ff6b35" opacity="0.8"/>
                <line x1="50" y1="40" x2="50" y2="60" stroke="white" strokeWidth="1.5"/>
                <line x1="40" y1="48" x2="45" y2="50" stroke="white" strokeWidth="1"/>
                <line x1="60" y1="48" x2="55" y2="50" stroke="white" strokeWidth="1"/>
                <path d="M85 20 L88 28 L96 28 L90 34 L92 42 L85 37 L78 42 L80 34 L74 28 L82 28 L85 20Z" fill="#ffd700"/>
              </svg>
              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#1e3c72', marginTop: '5px' }}>EST. 1962</div>
            </div>
            
            <div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🏛️ {collegeInfo.name}</h1>
              <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{collegeInfo.location}</p>
              <p style={{ marginTop: '10px' }}>
                Established: {collegeInfo.established} | {collegeInfo.accreditation}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>

      <div className="container">
        {/* Quote Section */}
        <div className="card" style={{ textAlign: 'center', background: '#f0f8ff', borderLeft: '4px solid #ff6b35' }}>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#1e3c72' }}>💭 "{currentQuote}"</p>
        </div>

        {/* Vision & Mission */}
        <div className="grid">
          <div className="card">
            <h2 className="card-title" style={{ color: '#1e3c72' }}>🎯 Our Vision</h2>
            <p style={{ lineHeight: '1.8', whiteSpace: 'pre-line' }}>{collegeInfo.vision}</p>
          </div>
          <div className="card">
            <h2 className="card-title" style={{ color: '#1e3c72' }}>📋 Our Mission</h2>
            <p style={{ lineHeight: '1.8', whiteSpace: 'pre-line' }}>{collegeInfo.mission}</p>
          </div>
        </div>

        {/* History Section */}
        <div className="card" style={{ background: '#fff8f0' }}>
          <h2 className="card-title">📜 Our History</h2>
          <p style={{ lineHeight: '1.8' }}>{collegeInfo.history}</p>
          <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#1e3c72' }}>
            🏆 First institution to bring higher education to KGF region
          </p>
        </div>

        {/* Departments & Courses */}
        <div className="card">
          <h2 className="card-title">🎓 Academic Programs</h2>
          <div className="grid">
            {collegeInfo.departments.map((dept, idx) => (
              <div key={idx} style={{ background: '#f4f6f9', padding: '15px', borderRadius: '8px' }}>
                <h3 style={{ color: '#2a5298', marginBottom: '10px' }}>{dept.name}</h3>
                <ul style={{ paddingLeft: '20px' }}>
                  {dept.courses.map((course, cidx) => (
                    <li key={cidx} style={{ margin: '5px 0' }}>{course}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Course Details Table */}
        <div className="card">
          <h2 className="card-title">📚 Courses Offered</h2>
          <table className="table">
            <thead>
              <tr><th>Course</th><th>Type</th><th>Duration</th><th>Seats</th><th>Description</th></tr>
            </thead>
            <tbody>
              {collegeInfo.courses.map((course, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 'bold' }}>{course.name}</td>
                  <td><span style={{ background: course.type === 'Aided' ? '#28a745' : '#ff6b35', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{course.type}</span></td>
                  <td>{course.duration}</td>
                  <td>{course.seats}</td>
                  <td>{course.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Facilities */}
        <div className="card">
          <h2 className="card-title">🏫 Campus Facilities</h2>
          <div className="grid">
            {collegeInfo.facilities.map((facility, idx) => (
              <div key={idx} style={{ textAlign: 'center', padding: '15px', background: '#f4f6f9', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem' }}>{facility.name.split(' ')[0]}</div>
                <h3 style={{ margin: '10px 0' }}>{facility.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>{facility.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Leadership */}
        <div className="grid">
          <div className="card">
            <h2 className="card-title">👩‍🏫 Leadership</h2>
            <p><strong>Principal:</strong> {collegeInfo.principal}</p>
            <p style={{ marginTop: '10px' }}>Under her able leadership, the college continues to empower students through quality education.</p>
          </div>
          <div className="card">
            <h2 className="card-title">📞 Contact Us</h2>
            <p><strong>📞 Phone:</strong> {collegeInfo.contact}</p>
            <p><strong>📧 Email:</strong> {collegeInfo.email}</p>
            <p><strong>🌐 Website:</strong> <a href={collegeInfo.website} target="_blank" rel="noopener noreferrer">{collegeInfo.website}</a></p>
            <p><strong>📍 Address:</strong> {collegeInfo.location}</p>
          </div>
        </div>

        {/* NEP/SEP Syllabus Section */}
        <div className="grid">
          <div className="card">
            <h2 className="card-title">📖 NEP Syllabus</h2>
            <p>National Education Policy 2020 - Multidisciplinary approach with multiple entry/exit options, choice based credit system, and holistic education.</p>
            <button className="btn btn-secondary" style={{ marginTop: '15px' }}>View NEP Structure</button>
          </div>
          <div className="card">
            <h2 className="card-title">📖 SEP Syllabus</h2>
            <p>Standard Education Program - Traditional semester system with annual examinations and structured curriculum.</p>
            <button className="btn btn-secondary" style={{ marginTop: '15px' }}>View SEP Structure</button>
          </div>
        </div>

        {/* Alumni Success Stories Section - REAL DATA from Admin */}
        <div className="card">
          <h2 className="card-title">🌟 Our Successful Alumni</h2>
          <p style={{ marginBottom: '20px' }}>Our graduates are making us proud across the globe!</p>
          {alumni.length === 0 ? (
            <div className="alert alert-info">
              No alumni stories added yet. 
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  const adminData = { collegeId: 'ADMIN001', password: 'admin123', name: 'College Admin', role: 'admin' };
                  localStorage.setItem('studyPedia_currentUser', JSON.stringify(adminData));
                  window.location.href = '/admin/manage-alumni';
                }} 
                style={{ marginLeft: '10px' }}
              >
                Add Alumni Now →
              </button>
            </div>
          ) : (
            <div className="grid">
              {alumni.map(alum => (
                <div key={alum.id} style={{ textAlign: 'center', padding: '15px', background: '#f4f6f9', borderRadius: '8px' }}>
                  {alum.imageData ? (
                    <img src={alum.imageData} alt={alum.name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }} />
                  ) : (
                    <div style={{ fontSize: '3rem' }}>👨‍🎓</div>
                  )}
                  <h3>{alum.name}</h3>
                  <p>{alum.course} - Batch {alum.batch}</p>
                  <p style={{ color: '#1e3c72', fontWeight: 'bold' }}>{alum.currentPosition} @ {alum.company}</p>
                  {alum.achievement && <small>🏆 {alum.achievement}</small>}
                  {alum.message && <p style={{ fontSize: '0.9rem', marginTop: '10px', fontStyle: 'italic' }}>"{alum.message}"</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Happy Students - Class Photos Section - REAL DATA from Admin */}
        <div className="card">
          <h2 className="card-title">📸 HappyUs - Memories That Last Forever</h2>
          <p style={{ marginBottom: '20px' }}>Our students enjoying campus life and creating beautiful memories!</p>
          
          {memories.length === 0 ? (
            <div className="alert alert-info">
              No memories added yet. 
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  const adminData = { collegeId: 'ADMIN001', password: 'admin123', name: 'College Admin', role: 'admin' };
                  localStorage.setItem('studyPedia_currentUser', JSON.stringify(adminData));
                  window.location.href = '/admin/manage-happyus';
                }} 
                style={{ marginLeft: '10px' }}
              >
                Add Photos Now →
              </button>
            </div>
          ) : (
            <div className="grid">
              {memories.map(memory => (
                <div key={memory.id} style={{ textAlign: 'center', padding: '15px', background: '#f4f6f9', borderRadius: '8px' }}>
                  {memory.imageData ? (
                    <img src={memory.imageData} alt={memory.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
                  ) : (
                    <div style={{ fontSize: '4rem' }}>📸</div>
                  )}
                  <h3>{memory.title}</h3>
                  <p>{memory.event} - {memory.year}</p>
                  <p style={{ fontSize: '0.9rem' }}>{memory.description}</p>
                </div>
              ))}
            </div>
          )}
          
          <div style={{ marginTop: '20px', textAlign: 'center', padding: '20px', background: '#fff8f0', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic' }}>"The moments we spent at Dr. T. Thimmaiah College are unforgettable. The friendships, the learning, the campus life - everything shaped who we are today!"</p>
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>- Alumni Association</p>
          </div>
        </div>

        {/* Login Buttons */}
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/login')} 
              style={{ fontSize: '1.2rem', padding: '15px 40px' }}
            >
              🎓 Student Login →
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                const adminData = { collegeId: 'ADMIN001', password: 'admin123', name: 'College Admin', role: 'admin' };
                localStorage.setItem('studyPedia_currentUser', JSON.stringify(adminData));
                window.location.href = '/admin';
              }} 
              style={{ fontSize: '1.2rem', padding: '15px 40px', background: '#ff6b35' }}
            >
              👨‍💼 Admin Login →
            </button>
          </div>
          <p style={{ marginTop: '20px', color: 'var(--gray)' }}>
            New Student? Get your College ID from Admin Office
          </p>
        </div>
      </div>
    </>
  );
};

export default CollegeInfo;