import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { FaUser, FaEnvelope, FaLock, FaStore, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

function OwnerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    restaurantName: '',
    location: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/ownerregister', formData);
      if (response.data.message) {
        navigate('/owner-login');
      }
    } catch (err) {
      setError('Registration failed! Please try again.');
    }
  };

  return (
    <div className="auth-page owner">
      <div className="left-section">
        <div className="welcome-content">
          <h1>Restaurant Partner Registration</h1>
          <p>Join our platform and reach thousands of students on campus</p>
          <div className="features">
            <div className="feature-item">
              <span className="feature-icon">💼</span>
              <span>Showcase your restaurant</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <span>Easy order management</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📈</span>
              <span>Increase your revenue</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span>Target student community</span>
            </div>
          </div>
        </div>
      </div>

      <div className="right-section">
        <div className="auth-form">
          <h2>Restaurant <span className="highlight">Registration</span></h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="icon-container">
                <FaUser />
              </div>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Owner Name" 
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="input-group">
              <div className="icon-container">
                <FaStore />
              </div>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  name="restaurantName"
                  placeholder="Restaurant Name" 
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="input-group">
              <div className="icon-container">
                <FaEnvelope />
              </div>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Business Email" 
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="input-group">
              <div className="icon-container">
                <FaLock />
              </div>
              <div className="input-wrapper">
                <input 
                  type="password" 
                  name="password"
                  placeholder="Password" 
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">
              Register Restaurant
            </button>
          </form>
          <div className="auth-footer">
            <p>Already have an account?</p>
            <button 
              onClick={() => navigate('/owner-login')} 
              className="link-button"
            >
              Login Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerRegister;
