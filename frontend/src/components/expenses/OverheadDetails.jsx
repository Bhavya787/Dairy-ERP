import React, { useState, useEffect } from 'react';
import { expenseService } from '../../services/api';

const OverheadDetails = () => {
  const [overheadData, setOverheadData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverheadData = async () => {
      try {
        const response = await expenseService.getOverheadDetails();
        setOverheadData(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch overhead data');
        setIsLoading(false);
        console.error('Error fetching overhead data:', err);
      }
    };

    fetchOverheadData();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading overhead data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="overhead-details-container">
      <h2>Overhead Details</h2>
      
      {overheadData.length === 0 ? (
        <p>No overhead data available.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Expense Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {overheadData.map((item, index) => (
                <tr key={index}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.expense_name}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OverheadDetails;
