import React, { useState, useEffect } from 'react';
import { logisticsService } from '../../services/api';

const TruckDetails = () => {
  const [truckData, setTruckData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTruckData = async () => {
      try {
        const response = await logisticsService.getTruckDetails();
        setTruckData(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch truck data');
        setIsLoading(false);
        console.error('Error fetching truck data:', err);
      }
    };

    fetchTruckData();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading truck data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="truck-details-container">
      <h2>Truck Details</h2>
      
      {truckData.length === 0 ? (
        <p>No truck data available.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Truck ID</th>
                <th>Registration</th>
                <th>Driver</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {truckData.map((truck, index) => (
                <tr key={index}>
                  <td>{truck.id}</td>
                  <td>{truck.registration}</td>
                  <td>{truck.driver}</td>
                  <td>{truck.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TruckDetails;
