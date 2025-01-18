import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUtensils, FaCoffee, FaHamburger, FaMoon, FaGraduationCap, FaArrowLeft, FaUser, FaBell, FaHeart, FaBookmark, FaStore, FaConciergeBell, FaRegCreditCard, FaHotdog, FaPizzaSlice } from 'react-icons/fa';
import { MdShoppingCart, MdRestaurantMenu, MdDashboard, MdHelp, MdLocalCafe, MdFastfood, MdRestaurant } from 'react-icons/md';
import { GiKnifeFork, GiCrossedSwords } from 'react-icons/gi';

const cardColors = [
  {
    gradient: 'linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)',
    accent: '#2196f3',
    textColor: '#333333',
    shadow: 'rgba(33, 150, 243, 0.15)'
  },
  {
    gradient: 'linear-gradient(135deg, #ffffff 0%, #e1f5fe 100%)',
    accent: '#03a9f4',
    textColor: '#333333',
    shadow: 'rgba(3, 169, 244, 0.15)'
  },
  {
    gradient: 'linear-gradient(135deg, #ffffff 0%, #b3e5fc 100%)',
    accent: '#039be5',
    textColor: '#333333',
    shadow: 'rgba(3, 155, 229, 0.15)'
  }
];

const styles = {
  container: {
    background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
    color: '#333333',
    minHeight: '100vh',
    padding: '0',
    fontFamily: 'Arial, sans-serif',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
    boxShadow: '0 2px 10px rgba(33, 150, 243, 0.2)',
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255,255,255,0.1)',
    },
  },
  activeNavLink: {
    background: 'rgba(255,255,255,0.2)',
  },
  header: {
    background: 'linear-gradient(90deg, #2c3e50 0%, #3498db 100%)',
    padding: '1rem 2rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    '&:hover': {
      transform: 'scale(1.02)',
      transition: 'transform 0.3s ease',
    },
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  logoMain: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  logoTagline: {
    fontSize: '0.9rem',
    fontWeight: 'normal',
    opacity: 0.9,
    letterSpacing: '0.5px',
  },
  mainContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1rem',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  categoryButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  categoryButton: {
    padding: '0.8rem 1.5rem',
    borderRadius: '12px',
    border: '1px solid rgba(33, 150, 243, 0.2)',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
  },
  itemList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    padding: '1rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto',
    border: '1px solid rgba(33, 150, 243, 0.2)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
  },
  cardImage: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '1rem',
  },
  cardHeader: {
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#2196f3',
    marginBottom: '0.5rem',
  },
  cardDescription: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '1rem',
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  priceColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  priceLabel: {
    fontSize: '0.8rem',
    color: '#666',
    marginBottom: '0.25rem',
  },
  priceValue: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#2196f3',
  },
  cardActions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    background: '#f0f0f0',
    borderRadius: '6px',
    overflow: 'hidden',
    width: '120px',
    margin: '0 auto',
  },
  quantityButton: {
    padding: '0.5rem 0.75rem',
    border: 'none',
    background: '#2196f3',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '40px',
    '&:hover': {
      background: '#1976d2',
    }
  },
  quantityDisplay: {
    padding: '0.5rem',
    width: '40px',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#2196f3',
    background: '#ffffff',
  },
  orderButton: {
    padding: '0.8rem 1.5rem',
    background: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    width: '100%',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: '#1976d2',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
    }
  },
  myOrdersButton: {
    padding: '0.8rem 1.2rem',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(45deg, #03a9f4, #4fc3f7)',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '&:hover': {
      background: 'linear-gradient(45deg, #039be5, #29b6f6)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(3, 169, 244, 0.3)',
    }
  },
  qrContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '1rem',
    borderRadius: '8px'
  },
  orderStatus: {
    padding: '0.5rem',
    borderRadius: '4px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    marginTop: '0.5rem'
  },
  pendingStatus: {
    background: '#fff9c4',
    color: '#ffa000'
  },
  acceptedStatus: {
    background: '#c8e6c9',
    color: '#388e3c'
  },
  rejectedStatus: {
    background: '#ffcdd2',
    color: '#d32f2f'
  },
  dashboardSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  dashboardText: {
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.1rem',
    fontWeight: '500',
    padding: '0.8rem 1.2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
  },
  studentIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'white',
    background: 'linear-gradient(45deg, #2196f3, #64b5f6)',
    border: 'none',
    padding: '0.8rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem',
    fontWeight: '500',
    '&:hover': {
      background: 'linear-gradient(45deg, #1e88e5, #42a5f5)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
    }
  },
  navIcons: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  iconButton: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    }
  },
  logoIcon: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px',
    marginRight: '12px',
    background: '#2196f3',
    borderRadius: '50%',
    padding: '8px',
    boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
  },
  mainIcon: {
    color: '#ffffff',
    transform: 'rotate(-45deg) scale(1.2)',
    filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.2))',
  },
  secondaryIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg) scale(0.8)',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  cardSection: {
    padding: '0.8rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    width: '100%',
    '&:last-child': {
      borderBottom: 'none',
      paddingBottom: 0,
    },
  },
  sectionHeading: {
    fontSize: '0.8rem',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '0.3rem',
    fontWeight: '600',
  },
  priceSection: {
    background: '#f8f9fa',
    padding: '0.8rem',
    margin: '0.5rem',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
  },
  priceLabel: {
    fontSize: '0.9rem',
    color: '#666',
    fontWeight: '500',
  },
  priceValue: {
    fontSize: '1.1rem',
    color: '#2196f3',
    fontWeight: '600',
  },
  quantitySection: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0.5rem',
    margin: '0.5rem',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    background: '#f0f0f0',
    borderRadius: '20px',
    padding: '0.2rem',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
  quantityButton: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: 'none',
    background: '#2196f3',
    color: 'white',
    fontSize: '1.2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      background: '#1976d2',
    },
  },
  quantityDisplay: {
    padding: '0 1rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#2196f3',
  },
  orderButton: {
    width: 'calc(100% - 2rem)',
    margin: '1rem',
    padding: '0.8rem',
    background: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: '#1976d2',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
    },
  },
};

const CategoryIcon = ({ category }) => {
  switch (category) {
    case 'breakfast':
      return <FaCoffee size={20} />;
    case 'lunch':
      return <FaUtensils size={20} />;
    case 'snack':
      return <FaHamburger size={20} />;
    case 'dinner':
      return <FaMoon size={20} />;
    default:
      return <MdRestaurantMenu size={20} />;
  }
};

const StudentDashboard = () => {
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const queryParam = selectedCategory && selectedCategory !== 'all' 
          ? `?menu=${selectedCategory}` 
          : '';
        const response = await axios.get(`http://localhost:4000/items${queryParam}`);
        setItems(response.data);

        const initialQuantities = {};
        response.data.forEach((item) => {
          initialQuantities[item._id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [selectedCategory]);

  const handleQuantityChange = (itemId, action) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max(1, prevQuantities[itemId] + (action === 'increment' ? 1 : -1)),
    }));
  };

  const handlePlaceOrder = async (itemId) => {
    const userId = localStorage.getItem('userId');
    const quantity = quantities[itemId];

    try {
      const response = await axios.post('http://localhost:4000/order', {
        itemId,
        quantity,
        orderedBy: userId,
        paymentStatus: 'pending',
      });

      if (response.data) {
        alert('Order placed successfully! Check My Orders for payment details.');
        navigate('/my-orders');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  const calculateTotalPrice = (item, quantity) => {
    return item.price * quantity;
  };

  const getCategoryButtonStyle = (category) => ({
    ...styles.categoryButton,
    background: selectedCategory === category 
      ? 'linear-gradient(45deg, #2196f3, #64b5f6)'
      : 'linear-gradient(to right, #ffffff, #e3f2fd)',
    color: selectedCategory === category ? '#ffffff' : '#2196f3',
    transform: selectedCategory === category ? 'translateY(-2px)' : 'none',
    boxShadow: selectedCategory === category 
      ? '0 4px 12px rgba(33, 150, 243, 0.3)'
      : 'none',
  });

  const navButtonColors = {
    quickOrder: {
      background: '#1565c0',
      hover: '#0d47a1'
    },
    specialOffers: {
      background: '#2e7d32',
      hover: '#1b5e20'
    },
    notifications: {
      background: '#c62828',
      hover: '#b71c1c'
    },
    favorites: {
      background: '#6a1b9a',
      hover: '#4a148c'
    },
    payment: {
      background: '#4527a0',
      hover: '#311b92'
    },
    help: {
      background: '#283593',
      hover: '#1a237e'
    },
    profile: {
      background: '#00838f',
      hover: '#006064'
    }
  };

  const navButtonStyles = {
    backButton: {
      background: 'linear-gradient(45deg, #1a237e, #283593)', // Deep Indigo
      hover: '#0d1b69',
      shadow: 'rgba(26, 35, 126, 0.4)'
    },
    studentDashboard: {
      background: 'linear-gradient(45deg, #004d40, #00695c)', // Deep Teal
      hover: '#00352c',
      shadow: 'rgba(0, 77, 64, 0.4)'
    },
    myOrders: {
      background: 'linear-gradient(45deg, #bf360c, #d84315)', // Deep Orange
      hover: '#a02c0a',
      shadow: 'rgba(191, 54, 12, 0.4)'
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.navLinks}>
          <button 
            style={{
              ...styles.backButton,
              background: navButtonStyles.backButton.background,
              '&:hover': {
                background: navButtonStyles.backButton.hover,
                boxShadow: `0 4px 12px ${navButtonStyles.backButton.shadow}`,
              }
            }} 
            onClick={() => navigate('/')}
          >
            <FaArrowLeft /> Back
          </button>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <GiKnifeFork size={30} style={styles.mainIcon} />
              <GiCrossedSwords size={24} style={styles.secondaryIcon} />
            </div>
            <div style={styles.logoText}>
              <span style={styles.logoMain}>Campus Bite</span>
              <span style={styles.logoTagline}>Taste the College Life</span>
            </div>
          </div>
        </div>
        
        <div style={styles.navIcons}>
          <button 
            style={{
              ...styles.iconButton,
              background: navButtonColors.quickOrder.background,
              '&:hover': { background: navButtonColors.quickOrder.hover }
            }} 
            title="Quick Order"
          >
            <FaConciergeBell size={18} />
          </button>
          <button 
            style={{
              ...styles.iconButton,
              background: navButtonColors.specialOffers.background,
              '&:hover': { background: navButtonColors.specialOffers.hover }
            }} 
            title="Special Offers"
          >
            <MdFastfood size={18} />
          </button>
          <button 
            style={{
              ...styles.iconButton,
              background: navButtonColors.notifications.background,
              '&:hover': { background: navButtonColors.notifications.hover }
            }} 
            title="Notifications"
          >
            <FaBell size={18} />
          </button>
          <button 
            style={{
              ...styles.iconButton,
              background: navButtonColors.favorites.background,
              '&:hover': { background: navButtonColors.favorites.hover }
            }} 
            title="Favorites"
          >
            <FaHeart size={18} />
          </button>
          <button 
            style={{
              ...styles.iconButton,
              background: navButtonColors.payment.background,
              '&:hover': { background: navButtonColors.payment.hover }
            }} 
            title="Payment"
          >
            <FaRegCreditCard size={18} />
          </button>
          <button 
            style={{
              ...styles.iconButton,
              background: navButtonColors.help.background,
              '&:hover': { background: navButtonColors.help.hover }
            }} 
            title="Help"
          >
            <MdHelp size={20} />
          </button>
          <button 
            style={{
              ...styles.iconButton,
              background: navButtonColors.profile.background,
              '&:hover': { background: navButtonColors.profile.hover }
            }} 
            title="Profile"
          >
            <FaUser size={18} />
          </button>
          <div style={{
            ...styles.dashboardText,
            background: navButtonStyles.studentDashboard.background,
            '&:hover': {
              background: navButtonStyles.studentDashboard.hover,
            }
          }}>
            <FaGraduationCap size={20} />
            Student Dashboard
          </div>
          <button
            style={{
              ...styles.myOrdersButton,
              background: navButtonStyles.myOrders.background,
              '&:hover': {
                background: navButtonStyles.myOrders.hover,
                boxShadow: `0 4px 12px ${navButtonStyles.myOrders.shadow}`,
              }
            }}
            onClick={() => navigate('/my-orders')}
          >
            <MdShoppingCart size={20} />
            My Orders
          </button>
        </div>
      </nav>

      <div style={styles.mainContent}>
        <div style={styles.categoryButtons}>
          <button
            onClick={() => setSelectedCategory('all')}
            style={getCategoryButtonStyle('all')}
          >
            <MdRestaurantMenu size={20} />
            All Available Items
          </button>
          {['breakfast', 'lunch', 'snack', 'dinner'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={getCategoryButtonStyle(category)}
            >
              <CategoryIcon category={category} />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div style={styles.itemList}>
          {items.map((item, index) => {
            const colorScheme = cardColors[index % cardColors.length];
            
            const cardStyle = {
              ...styles.card,
              background: colorScheme.gradient,
              boxShadow: `0 8px 25px ${colorScheme.shadow}`,
              border: `1px solid rgba(33, 150, 243, 0.1)`,
            };
            
            const quantityButtonStyle = {
              ...styles.quantityButton,
              background: colorScheme.accent,
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: `0 4px 12px ${colorScheme.shadow}`,
              },
            };
            
            const orderButtonStyle = {
              ...styles.orderButton,
              background: colorScheme.accent,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 15px ${colorScheme.shadow}`,
              },
            };

            return (
              <div key={item._id} style={cardStyle}>
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={styles.cardImage}
                  />
                )}
                
                <div style={styles.cardContent}>
                  <div style={styles.cardHeader}>
                    <h2 style={styles.cardTitle}>{item.title}</h2>
                    <p style={styles.cardDescription}>{item.description}</p>
                  </div>

                  <div style={styles.priceSection}>
                    <div style={styles.priceRow}>
                      <span style={styles.priceLabel}>Base Price:</span>
                      <span style={styles.priceValue}>₹{item.price}</span>
                    </div>
                    <div style={styles.priceRow}>
                      <span style={styles.priceLabel}>Total:</span>
                      <span style={styles.priceValue}>
                        ₹{calculateTotalPrice(item, quantities[item._id])}
                      </span>
                    </div>
                  </div>

                  <div style={styles.quantitySection}>
                    <div style={styles.quantityControl}>
                      <button
                        style={styles.quantityButton}
                        onClick={() => handleQuantityChange(item._id, 'decrement')}
                      >-</button>
                      <span style={styles.quantityDisplay}>{quantities[item._id]}</span>
                      <button
                        style={styles.quantityButton}
                        onClick={() => handleQuantityChange(item._id, 'increment')}
                      >+</button>
                    </div>
                  </div>

                  <button
                    style={styles.orderButton}
                    onClick={() => handlePlaceOrder(item._id)}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
