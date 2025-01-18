import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddFoodItem.css';
import { FaArrowLeft, FaUtensils, FaDollarSign, FaImage, FaList, FaUser, FaBell, FaCog } from 'react-icons/fa';
import { MdDescription, MdRestaurantMenu } from 'react-icons/md';

const AddFoodItem = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.ownerId) {
      navigate('/login');
      return;
    }
  }, [location.state, navigate]);

  const [foodItem, setFoodItem] = useState({
    title: '',
    description: '',
    price: '',
    available: true,
    foodType: 'Veg',
    menu: 'breakfast',
    imageUrl: '',
    createdBy: location.state?.ownerId || '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormErrors(prev => ({ ...prev, [name]: '' }));
    setFoodItem(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!location.state?.ownerId) {
      setMessage('User authentication required');
      setMessageType('error');
      return { auth: 'User authentication required' };
    }

    if (!foodItem.title.trim()) errors.title = 'Title is required';
    if (!foodItem.description.trim()) errors.description = 'Description is required';
    if (!foodItem.price || isNaN(foodItem.price) || Number(foodItem.price) <= 0) {
      errors.price = 'Please enter a valid price greater than 0';
    }
    if (!foodItem.imageUrl.trim()) errors.imageUrl = 'Image URL is required';
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setMessage('');
    setMessageType('');
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setMessage('Please fill in all required fields correctly');
      setMessageType('error');
      return;
    }

    try {
      if (!location.state?.ownerId) {
        throw new Error('User authentication required');
      }

      const payload = {
        ...foodItem,
        price: Number(foodItem.price),
        createdBy: location.state.ownerId
      };

      const response = await axios.post('http://localhost:4000/items', payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data) {
        setMessage('Food item added successfully!');
        setMessageType('success');
        setFormErrors({});
        setFoodItem({
          title: '',
          description: '',
          price: '',
          available: true,
          foodType: 'Veg',
          menu: 'breakfast',
          imageUrl: '',
          createdBy: location.state.ownerId,
        });
      }
    } catch (error) {
      console.error('Error adding food item:', error);
      let errorMessage;
      
      if (error.response) {
        errorMessage = error.response.data.message || 'Server error occurred';
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        errorMessage = error.message || 'Failed to add food item. Please try again.';
      }
      
      setMessage(errorMessage);
      setMessageType('error');
    }
  };

  const handleBackClick = () => {
    navigate('/owner-dashboard', { state: { ownerId: location.state?.ownerId } });
  };

  return (
    <div className="page-container">
      <nav className="nav-header">
        <div className="nav-left">
          <button onClick={handleBackClick} className="back-button">
            <FaArrowLeft /> <span>Back</span>
          </button>
          <div className="nav-title">
            <FaUtensils className="nav-icon" />
            <h1>Restaurant Management System</h1>
          </div>
        </div>
        <div className="nav-right">
          <button className="nav-icon-button" title="Notifications">
            <FaBell />
            <span className="nav-button-label">Notifications</span>
          </button>
          <button className="nav-icon-button" title="Profile">
            <FaUser />
            <span className="nav-button-label">Profile</span>
          </button>
          <button className="nav-icon-button" title="Settings">
            <FaCog />
            <span className="nav-button-label">Settings</span>
          </button>
        </div>
      </nav>

      <div className="add-item-container">
        <div className="form-card">
          <h2 className="form-title">
            <FaUtensils className="form-icon" /> Add New Food Item
          </h2>

          {message && (
            <div className={`form-message ${messageType}`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">
                <MdRestaurantMenu className="label-icon" /> Title
              </label>
              <div className="input-container">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={foodItem.title}
                  onChange={handleFormChange}
                  className={formErrors.title ? 'error' : ''}
                  placeholder="Enter food item name"
                  required
                />
              </div>
              {formErrors.title && <span className="error-text">{formErrors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">
                <MdDescription className="label-icon" /> Description
              </label>
              <div className="input-container">
                <textarea
                  id="description"
                  name="description"
                  value={foodItem.description}
                  onChange={handleFormChange}
                  className={formErrors.description ? 'error' : ''}
                  placeholder="Enter food item description"
                  required
                />
              </div>
              {formErrors.description && <span className="error-text">{formErrors.description}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="price">
                <FaDollarSign className="label-icon" /> Price
              </label>
              <div className="input-container">
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={foodItem.price}
                  onChange={handleFormChange}
                  className={formErrors.price ? 'error' : ''}
                  placeholder="Enter price"
                  required
                />
              </div>
              {formErrors.price && <span className="error-text">{formErrors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">
                <FaImage className="label-icon" /> Image URL
              </label>
              <div className="input-container">
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={foodItem.imageUrl}
                  onChange={handleFormChange}
                  className={formErrors.imageUrl ? 'error' : ''}
                  placeholder="Enter image URL"
                  required
                />
              </div>
              {formErrors.imageUrl && <span className="error-text">{formErrors.imageUrl}</span>}
            </div>

            <div className="form-row">
              <div className="form-group half-width">
                <label htmlFor="foodType">Food Type</label>
                <select
                  id="foodType"
                  name="foodType"
                  value={foodItem.foodType}
                  onChange={handleFormChange}
                  className={formErrors.foodType ? 'error' : ''}
                  required
                >
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                </select>
                {formErrors.foodType && <span className="error-text">{formErrors.foodType}</span>}
              </div>

              <div className="form-group half-width">
                <label htmlFor="menu">Menu</label>
                <select
                  id="menu"
                  name="menu"
                  value={foodItem.menu}
                  onChange={handleFormChange}
                  className={formErrors.menu ? 'error' : ''}
                  required
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="snack">Snack</option>
                  <option value="dinner">Dinner</option>
                </select>
                {formErrors.menu && <span className="error-text">{formErrors.menu}</span>}
              </div>
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={foodItem.available}
                onChange={(e) =>
                  setFoodItem({ ...foodItem, available: e.target.checked })
                }
                className={formErrors.available ? 'error' : ''}
              />
              <label htmlFor="available">Available</label>
              {formErrors.available && <span className="error-text">{formErrors.available}</span>}
            </div>

            <button type="submit" className="submit-button">
              <FaUtensils className="button-icon" /> Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFoodItem;
