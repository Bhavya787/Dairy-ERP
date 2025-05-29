import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { milkService } from '../../services/api';

const MilkBifurcation = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await milkService.recordBifurcation({
        looseMilk: parseFloat(data.looseMilk),
        milkForProduct: parseFloat(data.milkForProduct)
      });
      
      setMessage('Milk bifurcation recorded successfully');
      reset();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to record milk bifurcation'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="milk-bifurcation-container">
      <h2>Milk Bifurcation</h2>
      
      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="looseMilk">Loose Milk (Liters)</label>
          <input 
            type="number" 
            id="looseMilk"
            step="0.01"
            min="0"
            {...register('looseMilk', { 
              required: 'Loose milk quantity is required',
              min: {
                value: 0,
                message: 'Quantity cannot be negative'
              }
            })}
          />
          {errors.looseMilk && <span className="error">{errors.looseMilk.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="milkForProduct">Milk for Product (Liters)</label>
          <input 
            type="number" 
            id="milkForProduct"
            step="0.01"
            min="0"
            {...register('milkForProduct', { 
              required: 'Milk for product quantity is required',
              min: {
                value: 0,
                message: 'Quantity cannot be negative'
              }
            })}
          />
          {errors.milkForProduct && <span className="error">{errors.milkForProduct.message}</span>}
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Record Bifurcation'}
        </button>
      </form>
    </div>
  );
};

export default MilkBifurcation;
