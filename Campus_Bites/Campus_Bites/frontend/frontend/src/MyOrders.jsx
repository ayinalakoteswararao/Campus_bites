import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdFileDownload, MdConfirmationNumber } from 'react-icons/md';
import html2canvas from 'html2canvas';
import JsBarcode from 'jsbarcode';
import { 
  FaHistory, 
  FaShoppingBag, 
  FaArrowLeft, 
  FaClock, 
  FaExclamationTriangle,
  FaDownload,
  FaReceipt,
  FaQrcode,
  FaHome,
  FaCalendarAlt,
  FaBox,
  FaRupeeSign,
  FaClipboardList,
  FaShoppingCart
} from 'react-icons/fa';

// QR Code Modal Component
const QRModal = memo(({ qrData, onClose }) => {
  if (!qrData) return null;

  return (
    <div className="qr-modal-overlay" onClick={onClose}>
      <div className="qr-modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="qr-code">
          <h3 style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>Scan QR to Pay</h3>
          <img 
            src="/images/create.png"
            alt="Payment QR Code"
            style={{
              width: '250px',
              height: '250px',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
          <div className="payment-info">
            <p className="qr-text">Please scan this QR code to complete your payment</p>
            <button 
              className="done-button"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

const CustomAlert = ({ message, onClose }) => (
  <div style={{
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    animation: 'slideIn 0.3s ease'
  }}>
    <FaExclamationTriangle color="#FFD700" size={20} />
    <span style={{ fontSize: '1rem', fontWeight: '500' }}>{message}</span>
    <button 
      onClick={onClose}
      style={{
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: '4px',
        marginLeft: '8px',
        fontSize: '1.2rem',
        opacity: '0.7',
        transition: 'opacity 0.2s ease'
      }}
      onMouseOver={(e) => e.target.style.opacity = '1'}
      onMouseLeave={(e) => e.target.style.opacity = '0.7'}
    >
      ×
    </button>
  </div>
);

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQR, setSelectedQR] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setAlertMessage('Please log in to view your orders');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    setIsLoading(true);
    axios.get(`http://localhost:4000/orders/${userId}`)
      .then(response => {
        console.log('Orders received:', response.data);
        const sortedOrders = response.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setIsLoading(false);
      });
  }, [navigate]);

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '6px 12px',
      borderRadius: '12px',
      fontWeight: '500',
      fontSize: '0.875rem',
      textAlign: 'center',
      display: 'inline-block',
      minWidth: '100px',
    };

    const statusStyles = {
      'Pending': {
        backgroundColor: '#fff3cd',
        color: '#856404',
      },
      'Processing': {
        backgroundColor: '#cce5ff',
        color: '#004085',
      },
      'Completed': {
        backgroundColor: '#d4edda',
        color: '#155724',
      },
      'Cancelled': {
        backgroundColor: '#f8d7da',
        color: '#721c24',
      }
    };

    return { ...baseStyle, ...statusStyles[status] };
  };

  const downloadOrderImage = async (order) => {
    const orderPreview = document.createElement('div');
    orderPreview.style.padding = '0';
    orderPreview.style.width = '400px';
    orderPreview.style.position = 'fixed';
    orderPreview.style.left = '-9999px';
    orderPreview.style.fontFamily = 'Arial, sans-serif';
    
    // Create barcode canvas
    const barcodeCanvas = document.createElement('canvas');
    JsBarcode(barcodeCanvas, order._id.slice(-6).toUpperCase(), {
      format: "CODE128",
      width: 2,
      height: 80,
      displayValue: false,
      background: "#ffffff",
      lineColor: "#000000",
    });
    
    const barcodeUrl = barcodeCanvas.toDataURL('image/png');
    
    orderPreview.innerHTML = `
      <div style="background: #6366F1; color: white; padding: 30px 20px; text-align: center; border-radius: 20px 20px 0 0;">
        <h2 style="font-size: 2.5rem; margin: 0;">Campus Café</h2>
        <p style="font-size: 1.5rem; margin: 10px 0 0 0; opacity: 0.9;">Order Receipt</p>
      </div>

      <div style="background: white; padding: 30px 20px; text-align: center;">
        <div style="margin: 20px 0;">
          <img src="${barcodeUrl}" style="width: 200px; height: 80px;" />
          <div style="font-size: 1.5rem; margin-top: 15px;">
            <strong>Token: ${order._id.slice(-6).toUpperCase()}</strong>
          </div>
        </div>

        <div style="background: #f8f9fa; border-radius: 15px; padding: 20px; margin: 20px 0; text-align: left;">
          <h2 style="font-size: 2rem; margin: 0 0 20px 0; text-align: center;">${order.itemTitle}</h2>
          
          <div style="display: flex; align-items: center; margin: 10px 0;">
            <span style="margin-right: 10px;">🔑</span>
            <span style="color: #666;">Order ID:</span>
            <span style="margin-left: auto; color: #6366F1; font-family: monospace;">${order._id}</span>
          </div>

          <div style="display: flex; align-items: center; margin: 10px 0;">
            <span style="margin-right: 10px;">📦</span>
            <span style="color: #666;">Quantity:</span>
            <span style="margin-left: auto; font-weight: bold;">${order.quantity}</span>
          </div>

          <div style="display: flex; align-items: center; margin: 10px 0;">
            <span style="margin-right: 10px;">💰</span>
            <span style="color: #666;">Total Price:</span>
            <span style="margin-left: auto; font-weight: bold;">₹${order.orderPrice}</span>
          </div>

          <div style="display: flex; align-items: center; margin: 10px 0;">
            <span style="margin-right: 10px;">���</span>
            <span style="color: #666;">Status:</span>
            <span style="margin-left: auto; background: #ffd700; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem;">
              ${order.status}
            </span>
          </div>
        </div>

        <div style="text-align: center; margin: 20px 0;">
          <p style="margin: 5px 0; font-size: 1.2rem;">Thank you for your order! 🙏</p>
          <p style="color: #666; margin: 5px 0;">
            <span style="margin-right: 10px;">📅</span>
            Order Date: ${new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div style="background: #fff3f3; color: #ff4444; padding: 15px; border-radius: 10px; margin-top: 20px; text-align: center;">
          Please collect your order within 1 hour
        </div>
      </div>
    `;

    document.body.appendChild(orderPreview);

    try {
      const canvas = await html2canvas(orderPreview, {
        scale: 2,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `order-receipt-${order._id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating order receipt:', error);
      alert('Failed to generate order receipt');
    } finally {
      document.body.removeChild(orderPreview);
    }
  };

  const getTokenStyle = (status) => {
    const baseStyle = {
      ...styles.tokenContainer,
    };

    const statusColors = {
      'Pending': {
        background: 'linear-gradient(135deg, #FFA726, #FF7043)',
      },
      'Accepted': {
        background: 'linear-gradient(135deg, #66BB6A, #43A047)',
      },
      'Delivered': {
        background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
      },
      'Processing': {
        background: 'linear-gradient(135deg, #AB47BC, #8E24AA)',
      },
    };

    return {
      ...baseStyle,
      background: statusColors[status]?.background || baseStyle.background,
    };
  };

  return (
    <div style={styles.mainContainer}>
      {alertMessage && (
        <CustomAlert 
          message={alertMessage} 
          onClose={() => setAlertMessage(null)} 
        />
      )}
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.navTitleSection}>
            <FaShoppingBag size={24} color="white" style={{ marginRight: '10px' }}/>
            <h1 style={styles.navTitle}>My Orders</h1>
          </div>
          <button
            onClick={() => navigate('/student-dashboard')}
            style={styles.navButton}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <FaHome size={18} /> Back to Dashboard
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.contentContainer}>
        {isLoading ? (
          <div style={styles.loadingContainer}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <div className="loading-spinner"></div>
              <span>Loading orders...</span>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div style={styles.emptyContainer}>
            <h3 style={styles.emptyText}>No orders found</h3>
            <button
              onClick={() => navigate('/student-dashboard')}
              style={styles.returnButton}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Browse Items
            </button>
          </div>
        ) : (
          <>
            <div style={styles.warningBanner}>
              <div style={styles.warningIconContainer}>
                <FaExclamationTriangle size={22} />
              </div>
              <span style={styles.warningText}>
                Please collect your order within 60 minutes
              </span>
            </div>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>
                      <div style={styles.headerContent}>
                        <FaCalendarAlt style={styles.headerIcon} />
                        Date/Time
                      </div>
                    </th>
                    <th style={styles.tableHeader}>
                      <div style={styles.headerContent}>
                        <FaBox style={styles.headerIcon} />
                        Item
                      </div>
                    </th>
                    <th style={styles.tableHeader}>
                      <div style={styles.headerContent}>
                        <FaShoppingCart style={styles.headerIcon} />
                        Quantity
                      </div>
                    </th>
                    <th style={styles.tableHeader}>
                      <div style={styles.headerContent}>
                        <FaRupeeSign style={styles.headerIcon} />
                        Total Price
                      </div>
                    </th>
                    <th style={styles.tableHeader}>
                      <div style={styles.headerContent}>
                        <FaClipboardList style={styles.headerIcon} />
                        Status
                      </div>
                    </th>
                    <th style={styles.tableHeader}>
                      <div style={styles.headerContent}>
                        <MdConfirmationNumber style={styles.headerIcon} />
                        Token
                      </div>
                    </th>
                    <th style={styles.tableHeader}>
                      <div style={styles.headerContent}>
                        <FaQrcode style={styles.headerIcon} />
                        Payment
                      </div>
                    </th>
                    <th style={styles.tableHeader}>
                      <div style={styles.headerContent}>
                        <FaDownload style={styles.headerIcon} />
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id} style={styles.tableRow}>
                      <td style={styles.tableCell}>
                        <div style={styles.dateTimeContainer}>
                          <div style={styles.date}>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                          <div style={styles.time}>
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </td>
                      <td style={styles.tableCell}>{order.itemTitle}</td>
                      <td style={styles.tableCell}>{order.quantity}</td>
                      <td style={styles.tableCell}>
                        <span style={styles.price}>₹{order.orderPrice}</span>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={getStatusStyle(order.status)}>
                          {order.status}
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={getTokenStyle(order.status)}>
                          <MdConfirmationNumber size={20} />
                          <span style={styles.tokenText}>
                            {order._id.slice(-6).toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        {order.status === 'Accepted' && (
                          <button
                            onClick={() => setSelectedQR("/images/create.png")}
                            className="paymentButton"
                          >
                            <FaQrcode style={{ marginRight: '8px' }} />
                            Show QR
                          </button>
                        )}
                      </td>
                      <td style={styles.tableCell}>
                        <button
                          style={styles.downloadButton}
                          onClick={() => downloadOrderImage(order)}
                        >
                          <FaReceipt />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* QR Code Modal */}
      {selectedQR && (
        <QRModal 
          qrData={selectedQR} 
          onClose={() => setSelectedQR(null)} 
        />
      )}
    </div>
  );
}

const styles = {
  mainContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  navbar: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 2rem',
    boxShadow: '0 4px 20px rgba(79, 172, 254, 0.15)',
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    fontWeight: '500',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.3)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    },
  },
  contentContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  tableContainer: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    margin: '2rem auto',
    maxWidth: '1200px',
    backdropFilter: 'blur(10px)',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 0.5rem',
  },
  tableHeader: {
    padding: '1rem',
    textAlign: 'left',
    color: '#2c3e50',
    fontWeight: '600',
    borderBottom: '2px solid #e2e8f0',
    whiteSpace: 'nowrap',
  },
  tableRow: {
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#f8fafc',
    },
  },
  tableCell: {
    padding: '1rem',
    borderBottom: '1px solid #e2e8f0',
    color: '#2c3e50',
  },
  price: {
    fontWeight: '600',
    color: '#2d3748',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '3rem',
    color: 'white',
    fontSize: '1.2rem',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    maxWidth: '400px',
    margin: '2rem auto',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  emptyContainer: {
    textAlign: 'center',
    padding: '3rem',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    maxWidth: '500px',
    margin: '2rem auto',
  },
  emptyText: {
    color: '#1a202c',
    fontSize: '1.3rem',
    marginBottom: '1.5rem',
    fontWeight: '600',
  },
  returnButton: {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  paymentButton: {
    padding: '8px 16px',
    background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  downloadButton: {
    padding: '0.5rem 1rem',
    background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  tokenContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.8rem',
    background: 'linear-gradient(135deg, #FF9D6C, #FF6B6B)',
    borderRadius: '8px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    width: 'fit-content',
    margin: '0 auto',
    boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)',
    },
  },
  
  tokenText: {
    letterSpacing: '1px',
    fontFamily: 'monospace',
    fontSize: '1.1rem',
  },
  messageContainer: {
    background: 'rgba(0, 0, 0, 0.2)',
    padding: '1.2rem',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
  },
  
  warningBanner: {
    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    margin: '1rem auto 2rem auto',
    maxWidth: '1200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.2)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    animation: 'gentlePulse 3s infinite',
  },
  warningIconContainer: {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  warningText: {
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '500',
    letterSpacing: '0.3px',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.8rem 1.2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-2px)',
    },
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  
  headerIcon: {
    fontSize: '1.1rem',
    color: '#4a5568',
  },
  
  navTitleSection: {
    display: 'flex',
    alignItems: 'center',
  },
};

// Add this CSS to your stylesheet
const cssToAdd = `
.qr-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.qr-modal-content {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  position: relative;
  max-width: 90%;
  width: 450px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 5px 10px;
  border-radius: 50%;
  line-height: 1;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.2);
  color: #333;
}

.qr-code {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.payment-info {
  text-align: center;
  margin-top: 1rem;
}

.qr-text {
  color: #4a5568;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0.5rem 0;
}

.done-button {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: linear-gradient(45deg, #4facfe, #00f2fe);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.done-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.paymentButton {
  padding: 8px 16px;
  background: linear-gradient(45deg, #4facfe, #00f2fe);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.paymentButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.paymentButton:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes gentlePulse {
  0% {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.2);
  }
  50% {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
  }
  100% {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.2);
  }
}
`;

// Create a style element and add it to the document head
const style = document.createElement('style');
style.textContent = cssToAdd;
document.head.appendChild(style);

export default MyOrders;
