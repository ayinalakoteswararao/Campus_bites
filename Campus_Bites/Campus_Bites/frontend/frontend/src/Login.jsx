import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { IoSchoolOutline, IoFastFoodOutline, IoRestaurantOutline } from 'react-icons/io5';
import { HiOutlineBookOpen, HiOutlineClipboardList, HiOutlineShoppingCart } from 'react-icons/hi';
import { TbChartLine, TbTruck } from 'react-icons/tb';
import { MdDeliveryDining, MdPayment, MdOutlineLocalOffer } from 'react-icons/md';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', { email, password });  
      localStorage.setItem('userId', response.data.userId);     
      navigate('/student-dashboard', { state: { userId: response.data.userId } });
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
            <IoSchoolOutline className="logo-icon" />
            <span className="logo-text">Campus Bites</span>
          </div>
          
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Login to your student account</p>
          
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
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="sign-in-btn">
              Sign In
            </button>
          </form>
          
          <div className="register-section">
            <span>New Student? </span>
            <Link to="/register" className="create-account-link">
              Create Account
            </Link>
          </div>
          
          {error && <div className="error-message">{error}</div>}
        </div>

        {/* Right Side - Info Section */}
        <div className="login-info">
          <div className="info-content">
            <div className="campus-header">
              <h1>Hello Hungry Students! 👋</h1>
              <p>Craving something delicious? We've got your campus cravings covered!</p>
            </div>
            
            <div className="features-grid">
              <div className="feature-box">
                <IoFastFoodOutline className="box-icon" />
                <div className="feature-content">
                  <h3>Hungry? Order in Seconds! 🍔</h3>
                  <p>Skip the lines - order your favorite campus meals with just a few taps</p>
                </div>
              </div>

              <div className="feature-box">
                <MdPayment className="box-icon" />
                <div className="feature-content">
                  <h3>Easy-Peasy Payments 💳</h3>
                  <p>Pay with meal cards, credit cards, or digital wallets - whatever works for you!</p>
                </div>
              </div>

              <div className="feature-box">
                <MdOutlineLocalOffer className="box-icon" />
                <div className="feature-content">
                  <h3>Student Special Deals 🎉</h3>
                  <p>Exclusive discounts and deals that won't break your student budget</p>
                </div>
              </div>

            </div>
          </div>
          
          <div className="copyright">
            © 2024 Campus Bites - Making Student Life Tastier! 🎓
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
