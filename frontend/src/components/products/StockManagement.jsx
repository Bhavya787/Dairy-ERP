import React, { useState, useEffect } from 'react';
import { productService } from '../../services/api';

const StockManagement = () => {
  const [stockData, setStockData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await productService.getStockData();
        setStockData(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch stock data');
        setIsLoading(false);
        console.error('Error fetching stock data:', err);
      }
    };

    fetchStockData();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading stock data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="stock-management-container">
      <h2>Stock Management</h2>
      
      {stockData ? (
        <div className="stock-details">
          <p>Stock data would be displayed here</p>
        </div>
      ) : (
        <p>No stock data available.</p>
      )}
    </div>
  );
};

export default StockManagement;

