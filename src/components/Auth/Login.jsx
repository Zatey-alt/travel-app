import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import Video from '../assets/video.mp4';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load stored email and rememberMe preference from local storage
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedRememberMe = localStorage.getItem('rememberMe');

    if (storedEmail && storedRememberMe) {
      setEmail(storedEmail);
      setRememberMe(JSON.parse(storedRememberMe));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="video-background">
      <video autoPlay loop muted className="video-background">
        <source src={Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
      <div className='login-container'>
      <h2>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <label className='form-label'>
          Email:
          <input className='form-input' type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label className='form-label'>
          Password:
          <input
            className='form-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        
        <button className='form-button' type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Login'}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
      <p>
        <Link to="/landing-page">Home</Link>
      </p>
    </div>
  </div>
</div>

  );
}

export default Login;
