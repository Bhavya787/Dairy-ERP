import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const VendorPayments = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/vendors/payments', {
        vendorId: data.vendorId,
        amount: parseFloat(data.amount)
      });
      
      setMessage('Payment recorded successfully');
      reset();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to record payment'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vendor-payments-container">
      <h2>Vendor Payments</h2>
      
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
        
        <div className="form-group">
          <label htmlFor="amount">Payment Amount (₹)</label>
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
          {isLoading ? 'Processing...' : 'Record Payment'}
        </button>
      </form>
    </div>
  );
};

export default VendorPayments;
