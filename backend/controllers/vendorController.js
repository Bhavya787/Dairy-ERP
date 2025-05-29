const Vendor = require('../models/Vendor');

exports.registerVendor = async (req, res) => {
  try {
    const { vendorName, enterprise, GST, address, MobleNumber } = req.body;
    
    // Validate input
    if (!vendorName || !enterprise || !GST || !address || !MobleNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    const vendorId = await Vendor.register(vendorName, enterprise, GST, address, MobleNumber);
    
    res.status(201).json({
      success: true,
      message: 'Vendor registered successfully',
      vendorId
    });
  } catch (error) {
    console.error('Error registering vendor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register vendor',
      error: error.message
    });
  }
};

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.getAllVendors();
    
    res.status(200).json({
      success: true,
      data: vendors
    });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vendors',
      error: error.message
    });
  }
};

exports.setProductPrices = async (req, res) => {
  try {
    const { vendorId, ...prices } = req.body;
    
    // Validate input
    if (!vendorId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vendor ID is required' 
      });
    }
    
    const result = await Vendor.setProductPrices(vendorId, prices);
    
    res.status(200).json({
      success: true,
      message: 'Product prices set successfully'
    });
  } catch (error) {
    console.error('Error setting product prices:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to set product prices',
      error: error.message
    });
  }
};

exports.getVendorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const vendorStatus = await Vendor.getVendorStatus(id);
    
    res.status(200).json({
      success: true,
      data: vendorStatus
    });
  } catch (error) {
    console.error('Error fetching vendor status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vendor status',
      error: error.message
    });
  }
};

exports.recordPayment = async (req, res) => {
  try {
    const { vendorId, amount } = req.body;
    
    // Validate input
    if (!vendorId || !amount) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vendor ID and amount are required' 
      });
    }
    
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number'
      });
    }
    
    const result = await Vendor.recordPayment(vendorId, parseFloat(amount));
    
    res.status(200).json({
      success: true,
      message: 'Payment recorded successfully'
    });
  } catch (error) {
    console.error('Error recording payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record payment',
      error: error.message
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    
    const transactions = await Vendor.getTransactions(id);
    
    res.status(200).json({
      success: true,
      data: transactions
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions',
      error: error.message
    });
  }
};
