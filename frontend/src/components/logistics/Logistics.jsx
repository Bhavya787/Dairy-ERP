import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { logisticsService } from '../../services/api';

const Logistics = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await logisticsService.addLogisticsExpense(data);
      setMessage('Logistics expense added successfully');
      reset();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to add logistics expense'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="logistics-container">
      <h2>Add Logistics Expense</h2>
      
      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields would go here */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default Logistics;
