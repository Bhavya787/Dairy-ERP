import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Dairy ERP System</h1>
      <div className="welcome-section">
        <h2>Welcome to the ERP Management System</h2>
        <p>This system helps you manage your dairy business operations efficiently.</p>
      </div>
      
      <div className="features-section">
        <h3>Key Features</h3>
        <div className="feature-grid">
          <div className="feature-card">
            <h4>Farmer Management</h4>
            <p>Register farmers, record milk purchases, and manage payments.</p>
          </div>
          <div className="feature-card">
            <h4>Vendor Management</h4>
            <p>Register vendors, set product prices, and track transactions.</p>
          </div>
          <div className="feature-card">
            <h4>Product Management</h4>
            <p>Sell products, manage production, and monitor stock levels.</p>
          </div>
          <div className="feature-card">
            <h4>Logistics</h4>
            <p>Manage trucks, track logistics expenses, and monitor operations.</p>
          </div>
          <div className="feature-card">
            <h4>Expense Tracking</h4>
            <p>Record and monitor overhead expenses and operational costs.</p>
          </div>
          <div className="feature-card">
            <h4>Materials Management</h4>
            <p>Track milk bifurcation, raw materials, and usage.</p>
          </div>
        </div>
      </div>
      
      <div className="getting-started">
        <h3>Getting Started</h3>
        <p>Use the navigation menu to access different modules of the system.</p>
      </div>
    </div>
  );
};

export default Home;
