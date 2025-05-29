import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const UseRawMaterial = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // API call would go here
      setMessage('Raw material usage recorded successfully');
      reset();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to record material usage'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="use-raw-material-container">
      <h2>Use Raw Material</h2>
      
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
          <label htmlFor="quantity">Quantity Used</label>
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
          {isLoading ? 'Processing...' : 'Record Usage'}
        </button>
      </form>
    </div>
  );
};

export default UseRawMaterial;
