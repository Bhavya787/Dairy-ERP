import React, { useState, useEffect } from 'react';
import { farmerService } from '../../services/api';

const ShowFarmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await farmerService.getAllFarmers();
        setFarmers(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch farmers data');
        setIsLoading(false);
        console.error('Error fetching farmers:', err);
      }
    };

    fetchFarmers();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading farmers data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="show-farmers-container">
      <h2>Registered Farmers</h2>
      
      {farmers.length === 0 ? (
        <p>No farmers registered yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="farmers-table">
            <thead>
              <tr>
                <th>Token ID</th>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Account Number</th>
                <th>IFSC Code</th>
                <th>Branch</th>
                <th>Net Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer) => (
                <tr key={farmer.token_id}>
                  <td>{farmer.token_id}</td>
                  <td>{farmer.name}</td>
                  <td>{farmer.mobno}</td>
                  <td>{farmer.accno}</td>
                  <td>{farmer.ifsc}</td>
                  <td>{farmer.branch}</td>
                  <td className={farmer.net_amount > 0 ? 'amount-due' : ''}>
                    {farmer.net_amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowFarmers;
