import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorTransactions = () => {
  const [vendorId, setVendorId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vendorId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:5000/api/vendors/transactions/${vendorId}`);
      setTransactions(response.data.data);
    } catch (err) {
      setError(`Error: ${err.response?.data?.message || 'Failed to fetch transactions'}`);
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vendor-transactions-container">
      <h2>Vendor Transactions</h2>
      
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
          {isLoading ? 'Loading...' : 'View Transactions'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {isLoading && <div className="loading">Loading transactions...</div>}
      
      {transactions.length > 0 ? (
        <div className="transactions-table-container">
          <h3>Transaction History</h3>
          <div className="table-responsive">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Milk CM 500ml</th>
                  <th>Milk CM 200ml</th>
                  <th>Milk TM 500ml</th>
                  <th>Milk TM 200ml</th>
                  <th>Lassi 200ml</th>
                  {/* Additional columns would be added here */}
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                    <td>{transaction.MilkCM500Quan || 0}</td>
                    <td>{transaction.MilkCM200Quan || 0}</td>
                    <td>{transaction.MilkTM500Quan || 0}</td>
                    <td>{transaction.MilkTM200Quan || 0}</td>
                    <td>{transaction.Lassi200Quan || 0}</td>
                    {/* Additional data cells would be added here */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        !isLoading && vendorId && <p>No transactions found for this vendor.</p>
      )}
    </div>
  );
};

export default VendorTransactions;
