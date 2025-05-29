import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { productService } from '../../services/api';

const ProductProduction = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await productService.recordProduction(data);
      setMessage('Production recorded successfully');
      reset();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to record production'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-production-container">
      <h2>Record Production</h2>
      
      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields would go here */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Record Production'}
        </button>
      </form>
    </div>
  );
};

export default ProductProduction;
