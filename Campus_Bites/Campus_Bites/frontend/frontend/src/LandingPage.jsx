import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { FaUserGraduate, FaStore, FaArrowRight, FaUtensils, FaPhoneAlt, FaInfoCircle, FaHeart, FaQuoteLeft, FaGithub, FaGoogle, FaLinkedin, FaFacebook, FaTwitter, FaInstagram, FaGraduationCap, FaBook, FaLaptopCode } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate('/login');
  };

  const handleOwnerLogin = () => {
    navigate('/owner-login');
  };

  return (
    <div className="landing-page">
      {/* Hero Section with Animated Background */}
      <div className="hero-background">
        <div className="animated-shape shape-1"></div>
        <div className="animated-shape shape-2"></div>
        <div className="animated-shape shape-3"></div>
      </div>

      {/* Modern Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <FaUtensils className="nav-logo" />
          <span>Campus Bites</span>
        </div>
        <div className="nav-links">
          <a href="#features" className="nav-link">
            <FaInfoCircle /> Features
          </a>
          <a href="#testimonials" className="nav-link">
            <FaHeart /> Reviews
          </a>
          <a href="#contact" className="nav-link">
            <FaPhoneAlt /> Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{
        marginBottom: '0',
        paddingBottom: '4rem'
      }}>
        <div className="hero-content">
          <h1 className="hero-title" style={{ 
            fontSize: '5.0rem',
            marginBottom: '1.5rem',
            color: 'black',
            fontWeight: 'bold'
          }}>
            <span className="highlight">Fresh Eats</span> <br />
            For Busy Minds
          </h1>
          <p className="hero-subtitle">
          This is concise, catchy, and aligns well with the energy of campus life.
          It conveys freshness and productivity, making it relatable to students.
          </p>
          <div className="hero-cta-group">
            <button className="cta-button primary" onClick={handleStudentLogin}>
              <span className="button-content">
                <FaUserGraduate className="button-icon" />
                Student Login
              </span>
            </button>
            <button className="cta-button secondary" onClick={handleOwnerLogin}>
              <span className="button-content">
                <FaStore className="button-icon" />
                Restaurant Partner
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features" style={{
        marginTop: '0',
        padding: '4rem 4%',
        textAlign: 'center',
        background: 'white'
      }}>
        <div className="section-header" style={{
          marginBottom: '2rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 className="section-title" style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#27aae1'
          }}>Why Students Choose Us</h2>
          <p className="section-subtitle" style={{
            fontSize: '1.2rem',
            color: '#666'
          }}>Join thousands of students enjoying convenient campus dining</p>
        </div>
        <div className="features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '6rem',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem'
        }}>
          {[
            {
              icon: "🏃",
              title: "Quick Ordering",
              description: "Skip the lines with our fast and easy ordering system. Place orders in seconds!",
              metric: "30sec",
              metricLabel: "AVG. ORDER TIME"
            },
            {
              icon: "📱",
              title: "Mobile Friendly",
              description: "Order from anywhere on campus using our intuitive mobile app",
              metric: "24/7",
              metricLabel: "ACCESSIBILITY"
            },
            {
              icon: "⚡",
              title: "Real-time Updates",
              description: "Get instant notifications about your order status and delivery",
              metric: "100%",
              metricLabel: "ORDER TRACKING"
            }
          ].map((feature, index) => (
            <div className="feature-card" key={index} style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '1rem'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#333'
              }}>{feature.title}</h3>
              <p style={{
                color: '#666',
                marginBottom: '1.5rem',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>{feature.description}</p>
              <div style={{
                marginTop: 'auto'
              }}>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: feature.title === "Quick Ordering" ? '#27aae1' : 
                         feature.title === "Mobile Friendly" ? '#ff6b6b' : '#4ecdc4',
                  marginBottom: '0.5rem'
                }}>
                  {feature.metric}
                </div>
                <div style={{
                  color: '#888',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase'
                }}>
                  {feature.metricLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-header" style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5'
        }}>
          <span className="section-tag-large" style={{
            marginBottom: '0',
            fontSize: '3.8rem',
            color: '#666'
          }}>What Students Say</span>
          <h2 className="section-title" style={{
            marginTop: '0',
            fontSize: '2.5rem'
          }}>Student Experiences</h2>
        </div>
        <div className="testimonials-grid">
          {[
            {
              icon: <FaGraduationCap />,
              text: "Quick delivery, great prices - perfect for busy days!",
              name: "T.Nithin.",
              role: "CS Major",
              color: "#27aae1"
            },
            {
              icon: <FaBook />,
              text: "Love the student discounts and easy ordering!",
              name: "P.Bhuvana Chandra.",
              role: "Business",
              color: "#ff6b6b"
            },
            {
              icon: <FaLaptopCode />,
              text: "Real-time tracking helps plan my meals between classes.",
              name: "Manna Thommandru.",
              role: "Engineering",
              color: "#4ecdc4"
            }
          ].map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div className="testimonial-icon">
                  {testimonial.icon}
                </div>
                <div className="author-info">
                  <h4 style={{ 
                    margin: 0, 
                    fontWeight: '600',
                    color: testimonial.color 
                  }}>{testimonial.name}</h4>
                  <p style={{ margin: 0, color: '#666' }}>{testimonial.role}</p>
                </div>
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Replace footer with social media buttons */}
      <div className="social-media-footer" style={{
        padding: '2rem 0',
        background: 'transparent'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4rem'
        }}>
          <p style={{ 
            color: 'black',
            margin: 0,
            fontSize: '1.2rem',
            fontWeight: '600'
          }}>
            © 2024 Campus Bites
          </p>
          
          <div style={{
            width: '2px',
            height: '24px',
            background: 'black'
          }} />

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            <a href="https://www.facebook.com/campusbites" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="social-icon" 
               style={{
              background: '#27aae1',
              color: 'white',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              fontSize: '16px'
            }}>
              <FaFacebook />
            </a>
            <a href="https://twitter.com/campusbites" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="social-icon" 
               style={{
              background: '#27aae1',
              color: 'white',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              fontSize: '16px'
            }}>
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/campusbites" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="social-icon" 
               style={{
              background: '#27aae1',
              color: 'white',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              fontSize: '16px'
            }}>
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/campusbites" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="social-icon" 
               style={{
              background: '#27aae1',
              color: 'white',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              fontSize: '16px'
            }}>
              <FaLinkedin />
            </a>
          </div>

          <div style={{
            width: '2px',
            height: '24px',
            background: 'black'
          }} />

          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <a href="/terms-of-service.pdf" 
               target="_blank" 
               rel="noopener noreferrer" 
               style={{
              color: 'black',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Terms of Service
            </a>
            <a href="/privacy-policy.pdf" 
               target="_blank" 
               rel="noopener noreferrer" 
               style={{
              color: 'black',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;