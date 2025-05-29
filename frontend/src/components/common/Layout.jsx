import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ERP System</h1>
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li className="dropdown">
              <span>Farmers</span>
              <div className="dropdown-content">
                <Link to="/register-farmer">Register Farmer</Link>
                <Link to="/show-farmers">Show Farmers</Link>
                <Link to="/buy-milk">Buy Milk</Link>
                <Link to="/pay-farmer">Pay Farmer</Link>
              </div>
            </li>
            <li className="dropdown">
              <span>Vendors</span>
              <div className="dropdown-content">
                <Link to="/register-vendor">Register Vendor</Link>
                <Link to="/show-vendors">Show Vendors</Link>
                <Link to="/product-prices">Product Prices</Link>
                <Link to="/vendor-status">Vendor Status</Link>
                <Link to="/vendor-payments">Vendor Payments</Link>
                <Link to="/vendor-transactions">Vendor Transactions</Link>
              </div>
            </li>
            <li className="dropdown">
              <span>Products</span>
              <div className="dropdown-content">
                <Link to="/sell-products">Sell Products</Link>
                <Link to="/product-production">Product Production</Link>
                <Link to="/stock-management">Stock Management</Link>
              </div>
            </li>
            <li className="dropdown">
              <span>Logistics</span>
              <div className="dropdown-content">
                <Link to="/logistics">Logistics</Link>
                <Link to="/logistics-details">Logistics Details</Link>
                <Link to="/manage-trucks">Manage Trucks</Link>
                <Link to="/truck-details">Truck Details</Link>
              </div>
            </li>
            <li className="dropdown">
              <span>Expenses</span>
              <div className="dropdown-content">
                <Link to="/overhead">Overhead</Link>
                <Link to="/overhead-details">Overhead Details</Link>
              </div>
            </li>
            <li className="dropdown">
              <span>Materials</span>
              <div className="dropdown-content">
                <Link to="/milk-bifurcation">Milk Bifurcation</Link>
                <Link to="/raw-materials">Raw Materials</Link>
                <Link to="/use-raw-materials">Use Raw Materials</Link>
                <Link to="/raw-materials-details">Raw Materials Details</Link>
              </div>
            </li>
          </ul>
        </nav>
      </header>
      <main className="app-content">
        {children}
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} ERP System</p>
      </footer>
    </div>
  );
};

export default Layout;
