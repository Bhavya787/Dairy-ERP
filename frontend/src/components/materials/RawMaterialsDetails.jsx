import React, { useState, useEffect } from 'react';

const RawMaterialsDetails = () => {
  const [materialsData, setMaterialsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMaterialsData([
        { id: 1, name: 'Sugar', quantity: 100, unit: 'kg' },
        { id: 2, name: 'Salt', quantity: 50, unit: 'kg' },
        { id: 3, name: 'Flavoring', quantity: 25, unit: 'liters' }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <div className="loading">Loading raw materials data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="raw-materials-details-container">
      <h2>Raw Materials Details</h2>
      
      {materialsData.length === 0 ? (
        <p>No raw materials data available.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {materialsData.map((material) => (
                <tr key={material.id}>
                  <td>{material.id}</td>
                  <td>{material.name}</td>
                  <td>{material.quantity}</td>
                  <td>{material.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RawMaterialsDetails;
