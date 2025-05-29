import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ProductPrices = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/products/prices', data);
      setMessage('Product prices set successfully');
      reset();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to set product prices'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-prices-container">
      <h2>Set Product Prices</h2>
      
      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="vendorId">Vendor ID</label>
          <input 
            type="text" 
            id="vendorId"
            {...register('vendorId', { 
              required: 'Vendor ID is required',
              pattern: {
                value: /^\d+$/,
                message: 'Please enter a valid vendor ID'
              }
            })}
          />
          {errors.vendorId && <span className="error">{errors.vendorId.message}</span>}
        </div>
        
        <div className="form-section">
          <h3>Milk Products</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="MilkCM500Price">Milk CM 500ml Price</label>
              <input 
                type="number" 
                id="MilkCM500Price"
                step="0.01"
                min="0"
                {...register('MilkCM500Price', { required: true })}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="MilkCM200Price">Milk CM 200ml Price</label>
              <input 
                type="number" 
                id="MilkCM200Price"
                step="0.01"
                min="0"
                {...register('MilkCM200Price', { required: true })}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="MilkTM500Price">Milk TM 500ml Price</label>
              <input 
                type="number" 
                id="MilkTM500Price"
                step="0.01"
                min="0"
                {...register('MilkTM500Price', { required: true })}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="MilkTM200Price">Milk TM 200ml Price</label>
              <input 
                type="number" 
                id="MilkTM200Price"
                step="0.01"
                min="0"
                {...register('MilkTM200Price', { required: true })}
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Lassi Products</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Lassi200Price">Lassi 200ml Price</label>
              <input 
                type="number" 
                id="Lassi200Price"
                step="0.01"
                min="0"
                {...register('Lassi200Price', { required: true })}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="LassiCUP200Price">Lassi Cup 200ml Price</label>
              <input 
                type="number" 
                id="LassiCUP200Price"
                step="0.01"
                min="0"
                {...register('LassiCUP200Price', { required: true })}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="LassiMANGOCUP200Price">Lassi Mango Cup 200ml Price</label>
              <input 
                type="number" 
                id="LassiMANGOCUP200Price"
                step="0.01"
                min="0"
                {...register('LassiMANGOCUP200Price', { required: true })}
              />
            </div>
          </div>
        </div>
        
        {/* Additional product sections would be added here */}
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Set Prices'}
        </button>
      </form>
    </div>
  );
};

export default ProductPrices;
