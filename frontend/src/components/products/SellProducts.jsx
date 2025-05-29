import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SellProducts = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/products/sell', data);
      setMessage('Products sold successfully');
      reset();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to record sale'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sell-products-container">
      <h2>Sell Products</h2>
      
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
              <label htmlFor="MilkCM500Quan">Milk CM 500ml Quantity</label>
              <input 
                type="number" 
                id="MilkCM500Quan"
                min="0"
                {...register('MilkCM500Quan', { min: 0 })}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="MilkCM200Quan">Milk CM 200ml Quantity</label>
              <input 
                type="number" 
                id="MilkCM200Quan"
                min="0"
                {...register('MilkCM200Quan', { min: 0 })}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="MilkTM500Quan">Milk TM 500ml Quantity</label>
              <input 
                type="number" 
                id="MilkTM500Quan"
                min="0"
                {...register('MilkTM500Quan', { min: 0 })}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="MilkTM200Quan">Milk TM 200ml Quantity</label>
              <input 
                type="number" 
                id="MilkTM200Quan"
                min="0"
                {...register('MilkTM200Quan', { min: 0 })}
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Lassi Products</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Lassi200Quan">Lassi 200ml Quantity</label>
              <input 
                type="number" 
                id="Lassi200Quan"
                min="0"
                {...register('Lassi200Quan', { min: 0 })}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="LassiCUP200Quan">Lassi Cup 200ml Quantity</label>
              <input 
                type="number" 
                id="LassiCUP200Quan"
                min="0"
                {...register('LassiCUP200Quan', { min: 0 })}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="LassiMANGOCUP200Quan">Lassi Mango Cup 200ml Quantity</label>
              <input 
                type="number" 
                id="LassiMANGOCUP200Quan"
                min="0"
                {...register('LassiMANGOCUP200Quan', { min: 0 })}
              />
            </div>
          </div>
        </div>
        
        {/* Additional product sections would be added here */}
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Record Sale'}
        </button>
      </form>
    </div>
  );
};

export default SellProducts;
