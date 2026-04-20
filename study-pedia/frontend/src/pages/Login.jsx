import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const Login = ({ setIsAuthenticated, setUser }) => {
  const navigate = useNavigate();
  const [collegeId, setCollegeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        collegeId,
        password
      });
      
      console.log('Login response:', response.data);
      console.log('User role:', response.data.user.role);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setIsAuthenticated(true);
      setUser(response.data.user);
      
      // Check role and redirect accordingly
      if (response.data.user.role === 'admin') {
        console.log('Redirecting to Admin Panel');
        navigate('/admin');
      } else {
        console.log('Redirecting to Student Dashboard');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid College ID or Password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Student Login</h2>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">College ID</label>
              <input
                type="text"
                className="form-input"
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value)}
                placeholder="Enter your College ID"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="alert alert-info" style={{ marginTop: '20px' }}>
            <strong>Demo Credentials:</strong><br />
            👨‍💼 <strong>Admin:</strong> ADMIN001 | Password: admin123<br />
            🎓 <strong>BCA Student:</strong> BCA2024001 | Password: 123
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;