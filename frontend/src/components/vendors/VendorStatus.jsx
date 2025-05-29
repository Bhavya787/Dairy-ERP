import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorStatus = () => {
  const [vendorId, setVendorId] = useState('');
  const [vendorData, setVendorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vendorId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:5000/api/vendors/status/${vendorId}`);
      setVendorData(response.data.data);
    } catch (err) {
      setError(`Error: ${err.response?.data?.message || 'Failed to fetch vendor status'}`);
      setVendorData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vendor-status-container">
      <h2>Vendor Status</h2>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="vendorId">Vendor ID</label>
          <input 
            type="text" 
            id="vendorId"
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            placeholder="Enter vendor ID"
            required
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Check Status'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {isLoading && <div className="loading">Loading vendor data...</div>}
      
      {vendorData && (
        <div className="vendor-details">
          <h3>Vendor Details</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="label">Name:</span>
              <span className="value">{vendorData.name}</span>
            </div>
            <div className="detail-item">
              <span className="label">Enterprise:</span>
              <span className="value">{vendorData.enterprise}</span>
            </div>
            <div className="detail-item">
              <span className="label">GST Number:</span>
              <span className="value">{vendorData.gstno}</span>
            </div>
            <div className="detail-item">
              <span className="label">Address:</span>
              <span className="value">{vendorData.address}</span>
            </div>
            <div className="detail-item">
              <span className="label">Mobile Number:</span>
              <span className="value">{vendorData.mobno}</span>
            </div>
            <div className="detail-item">
              <span className="label">Current Balance:</span>
              <span className="value">₹{vendorData.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorStatus;
