import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { logisticsService } from '../../services/api';

const ManageTrucks = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await logisticsService.manageTrucks(data);
      setMessage('Truck information updated successfully');
      reset();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to update truck information'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="manage-trucks-container">
      <h2>Manage Trucks</h2>
      
      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields would go here */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Update Truck Information'}
        </button>
      </form>
    </div>
  );
};

export default ManageTrucks;
