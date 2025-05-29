import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vendors');
        setVendors(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch vendors data');
        setIsLoading(false);
        console.error('Error fetching vendors:', err);
      }
    };

    fetchVendors();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading vendors data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="show-vendors-container">
      <h2>Registered Vendors</h2>
      
      {vendors.length === 0 ? (
        <p>No vendors registered yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="vendors-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Enterprise</th>
                <th>GST Number</th>
                <th>Address</th>
                <th>Mobile Number</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td>{vendor.id}</td>
                  <td>{vendor.name}</td>
                  <td>{vendor.enterprise}</td>
                  <td>{vendor.gstno}</td>
                  <td>{vendor.address}</td>
                  <td>{vendor.mobno}</td>
                  <td>{vendor.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowVendors;
