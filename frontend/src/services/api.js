// API service for making requests to the backend
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Farmer API services
export const farmerService = {
  registerFarmer: (farmerData) => {
    return api.post('/farmers/register', farmerData);
  },
  getAllFarmers: () => {
    return api.get('/farmers');
  },
  payFarmer: (paymentData) => {
    return api.post('/farmers/pay', paymentData);
  }
};

// Milk API services
export const milkService = {
  buyMilk: (milkData) => {
    return api.post('/milk/buy', milkData);
  },
  recordBifurcation: (bifurcationData) => {
    return api.post('/milk/bifurcation', bifurcationData);
  }
};

// Vendor API services
export const vendorService = {
  registerVendor: (vendorData) => {
    return api.post('/vendors/register', vendorData);
  },
  getAllVendors: () => {
    return api.get('/vendors');
  },
  setProductPrices: (priceData) => {
    return api.post('/vendors/prices', priceData);
  },
  getVendorStatus: (vendorId) => {
    return api.get(`/vendors/status/${vendorId}`);
  },
  recordPayment: (paymentData) => {
    return api.post('/vendors/payments', paymentData);
  },
  getTransactions: (vendorId) => {
    return api.get(`/vendors/transactions/${vendorId}`);
  }
};

// Product API services
export const productService = {
  sellProducts: (saleData) => {
    return api.post('/products/sell', saleData);
  },
  getProductPrices: (vendorId) => {
    return api.get(`/products/prices/${vendorId}`);
  },
  recordProduction: (productionData) => {
    return api.post('/products/production', productionData);
  },
  getStockData: () => {
    return api.get('/products/stock');
  }
};

// Logistics API services
export const logisticsService = {
  getLogisticsData: () => {
    return api.get('/logistics');
  },
  addLogisticsExpense: (expenseData) => {
    return api.post('/logistics', expenseData);
  },
  manageTrucks: (truckData) => {
    return api.post('/logistics/trucks', truckData);
  },
  getTruckDetails: () => {
    return api.get('/logistics/trucks');
  }
};

// Expense API services
export const expenseService = {
  getOverheadData: () => {
    return api.get('/expenses/overhead');
  },
  addOverheadExpense: (expenseData) => {
    return api.post('/expenses/overhead', expenseData);
  },
  getOverheadDetails: () => {
    return api.get('/expenses/overhead/details');
  }
};

export default {
  farmerService,
  milkService,
  vendorService,
  productService,
  logisticsService,
  expenseService
};
