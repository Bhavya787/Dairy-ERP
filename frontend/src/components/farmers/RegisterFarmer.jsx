import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { farmerService } from '../../services/api';

const RegisterFarmer = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await farmerService.registerFarmer(data);
      setMessage(`Registration successful! Farmer token: ${response.data.token_id}`);
      reset();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to register farmer'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-farmer-container">
      <h2>Register Farmer</h2>
      
      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="mobno">Mobile Number</label>
          <input 
            type="text" 
            id="mobno"
            {...register('mobno', { 
              required: 'Mobile number is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Please enter a valid 10-digit mobile number'
              }
            })}
          />
          {errors.mobno && <span className="error">{errors.mobno.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="accno">Account Number</label>
          <input 
            type="text" 
            id="accno"
            {...register('accno', { 
              required: 'Account number is required'
            })}
          />
          {errors.accno && <span className="error">{errors.accno.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="ifsc">IFSC Code</label>
          <input 
            type="text" 
            id="ifsc"
            {...register('ifsc', { 
              required: 'IFSC code is required',
              pattern: {
                value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                message: 'Please enter a valid IFSC code'
              }
            })}
          />
          {errors.ifsc && <span className="error">{errors.ifsc.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <input 
            type="text" 
            id="branch"
            {...register('branch', { required: 'Branch is required' })}
          />
          {errors.branch && <span className="error">{errors.branch.message}</span>}
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register Farmer'}
        </button>
      </form>
    </div>
  );
};

export default RegisterFarmer;
