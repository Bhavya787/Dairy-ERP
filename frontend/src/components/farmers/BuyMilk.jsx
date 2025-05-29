import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { milkService } from '../../services/api';

const BuyMilk = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await milkService.buyMilk({
        FID: data.token,
        Quantity: data.quantity,
        Amount: data.amount
      });
      
      setMessage('Milk purchase recorded successfully');
      reset();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to record milk purchase'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="buy-milk-container">
      <h2>Buy Milk</h2>
      
      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="token">Farmer Token ID</label>
          <input 
            type="text" 
            id="token"
            {...register('token', { 
              required: 'Farmer Token ID is required',
              pattern: {
                value: /^\d+$/,
                message: 'Please enter a valid token ID'
              }
            })}
          />
          {errors.token && <span className="error">{errors.token.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="quantity">Quantity (Liters)</label>
          <input 
            type="number" 
            id="quantity"
            step="0.01"
            min="0.01"
            {...register('quantity', { 
              required: 'Quantity is required',
              min: {
                value: 0.01,
                message: 'Quantity must be greater than 0'
              }
            })}
          />
          {errors.quantity && <span className="error">{errors.quantity.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount per Liter (₹)</label>
          <input 
            type="number" 
            id="amount"
            step="0.01"
            min="0.01"
            {...register('amount', { 
              required: 'Amount is required',
              min: {
                value: 0.01,
                message: 'Amount must be greater than 0'
              }
            })}
          />
          {errors.amount && <span className="error">{errors.amount.message}</span>}
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Record Purchase'}
        </button>
      </form>
    </div>
  );
};

export default BuyMilk;
