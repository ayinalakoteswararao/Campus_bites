import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './OwnerLogin.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { IoRestaurantOutline } from 'react-icons/io5';

function OwnerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/ownerlogin', { email, password });
      if (response.data.success) {
        localStorage.setItem('ownerId', response.data.ownerId);
        navigate('/owner-dashboard', { state: { ownerId: response.data.ownerId } });
      } else {
        setError(response.data.message || 'Invalid credentials! Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Side - Login Form */}
        <div className="login-form-section">
          <div className="project-logo">
            <IoRestaurantOutline className="logo-icon" />
            <span className="logo-text">Campus Bites Partner</span>
          </div>
          
          <h1 className="login-title">Welcome Back Partner</h1>
          <p className="login-subtitle">Login to your restaurant dashboard</p>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="modern-input"
              />
            </div>
            
            <div className="input-group">
              <FaLock className="input-icon" />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="modern-input"
              />
            </div>

            <div className="forgot-password">
              <Link to="/owner-forgot-password" className="forgot-link">
                <i className="far fa-question-circle"></i> Forgot Password?
              </Link>
            </div>

            <button type="submit" className="sign-in-btn">
              <i className="far fa-sign-in"></i>
              Sign In
            </button>
          </form>
          
          <div className="register-section">
            <span>New Restaurant Partner? </span>
            <Link to="/owner-register" className="create-account-link">
              <i className="far fa-user-plus"></i> Join Now
            </Link>
          </div>
          
          {error && <div className="error-message">{error}</div>}
        </div>

        {/* Right Side - Info Section */}
        <div className="login-info">
          <div className="info-content">
            <div className="campus-header">
              <h1>Hello Restaurant Partners! 👋</h1>
              <p>Join our platform to expand your business and reach more customers on campus!</p>
            </div>
            <div className="features-grid">
              <div className="feature-box">
                <div className="feature-content">
                  <h3>Expand Your Reach 🏪</h3>
                  <p>Connect with thousands of students looking for great food options</p>
                </div>
              </div>
              <div className="feature-box">
                <div className="feature-content">
                  <h3>Easy Management 📊</h3>
                  <p>Manage orders, menu, and deliveries all in one place</p>
                </div>
              </div>
              <div className="feature-box">
                <div className="feature-content">
                  <h3>Secure Payments 💳</h3>
                  <p>Get paid securely and on time for every order</p>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright">
            © 2024 Campus Bites Partner. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerLogin;
