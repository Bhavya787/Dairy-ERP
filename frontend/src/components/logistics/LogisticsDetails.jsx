import React, { useState, useEffect } from 'react';
import { logisticsService } from '../../services/api';

const LogisticsDetails = () => {
  const [logisticsData, setLogisticsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogisticsData = async () => {
      try {
        const response = await logisticsService.getLogisticsData();
        setLogisticsData(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch logistics data');
        setIsLoading(false);
        console.error('Error fetching logistics data:', err);
      }
    };

    fetchLogisticsData();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading logistics data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="logistics-details-container">
      <h2>Logistics Details</h2>
      
      {logisticsData.length === 0 ? (
        <p>No logistics data available.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {logisticsData.map((item, index) => (
                <tr key={index}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.description}</td>
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

export default LogisticsDetails;
