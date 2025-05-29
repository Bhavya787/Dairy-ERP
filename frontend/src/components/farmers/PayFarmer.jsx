import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { farmerService } from '../../services/api';

const PayFarmer = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await farmerService.payFarmer({
        token_id: data.token_id,
        amount_paid: parseFloat(data.amount_paid)
      });
      
      setMessage(`${response.data.message} Amount paid: ${response.data.amount_paid}`);
      reset();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to process payment'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pay-farmer-container">
      <h2>Pay Farmer</h2>
      
      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="token_id">Farmer Token ID</label>
          <input 
            type="text" 
            id="token_id"
            {...register('token_id', { 
              required: 'Farmer Token ID is required',
              pattern: {
                value: /^\d+$/,
                message: 'Please enter a valid token ID'
              }
            })}
          />
          {errors.token_id && <span className="error">{errors.token_id.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="amount_paid">Amount to Pay (₹)</label>
          <input 
            type="number" 
            id="amount_paid"
            step="0.01"
            min="0.01"
            {...register('amount_paid', { 
              required: 'Amount is required',
              min: {
                value: 0.01,
                message: 'Amount must be greater than 0'
              }
            })}
          />
          {errors.amount_paid && <span className="error">{errors.amount_paid.message}</span>}
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Pay Farmer'}
        </button>
      </form>
    </div>
  );
};

export default PayFarmer;
