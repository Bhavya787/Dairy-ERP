import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const RawMaterials = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // API call would go here
      setMessage('Raw materials added successfully');
      reset();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to add raw materials'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="raw-materials-container">
      <h2>Add Raw Materials</h2>
      
      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="materialName">Material Name</label>
          <input 
            type="text" 
            id="materialName"
            {...register('materialName', { required: 'Material name is required' })}
          />
          {errors.materialName && <span className="error">{errors.materialName.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
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
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Add Materials'}
        </button>
      </form>
    </div>
  );
};

export default RawMaterials;
