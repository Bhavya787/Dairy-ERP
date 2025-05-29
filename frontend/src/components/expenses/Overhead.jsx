import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { expenseService } from '../../services/api';

const Overhead = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await expenseService.addOverheadExpense(data);
      setMessage('Overhead expense added successfully');
      reset();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to add overhead expense'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overhead-container">
      <h2>Add Overhead Expense</h2>
      
      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="expenseName">Expense Name</label>
          <input 
            type="text" 
            id="expenseName"
            {...register('expenseName', { required: 'Expense name is required' })}
          />
          {errors.expenseName && <span className="error">{errors.expenseName.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
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
          {isLoading ? 'Processing...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default Overhead;
