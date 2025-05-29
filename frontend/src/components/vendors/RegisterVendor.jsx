import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RegisterVendor = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/vendors/register', data);
      setMessage(`Registration successful! Vendor ID: ${response.data.vendorId}`);
      reset();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to register vendor'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-vendor-container">
      <h2>Register Vendor</h2>
      
      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="vendorName">Vendor Name</label>
          <input 
            type="text" 
            id="vendorName"
            {...register('vendorName', { required: 'Vendor name is required' })}
          />
          {errors.vendorName && <span className="error">{errors.vendorName.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="enterprise">Enterprise</label>
          <input 
            type="text" 
            id="enterprise"
            {...register('enterprise', { required: 'Enterprise is required' })}
          />
          {errors.enterprise && <span className="error">{errors.enterprise.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="GST">GST Number</label>
          <input 
            type="text" 
            id="GST"
            {...register('GST', { 
              required: 'GST number is required',
              pattern: {
                value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                message: 'Please enter a valid GST number'
              }
            })}
          />
          {errors.GST && <span className="error">{errors.GST.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea 
            id="address"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address && <span className="error">{errors.address.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="MobleNumber">Mobile Number</label>
          <input 
            type="text" 
            id="MobleNumber"
            {...register('MobleNumber', { 
              required: 'Mobile number is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Please enter a valid 10-digit mobile number'
              }
            })}
          />
          {errors.MobleNumber && <span className="error">{errors.MobleNumber.message}</span>}
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register Vendor'}
        </button>
      </form>
    </div>
  );
};

export default RegisterVendor;
