const Product = require('../models/Product');

exports.sellProducts = async (req, res) => {
  try {
    const { vendorId, ...products } = req.body;
    
    // Validate input
    if (!vendorId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vendor ID is required' 
      });
    }
    
    const result = await Product.sellProducts(vendorId, products);
    
    res.status(200).json({
      success: true,
      message: 'Products sold successfully'
    });
  } catch (error) {
    console.error('Error selling products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sell products',
      error: error.message
    });
  }
};

exports.getProductPrices = async (req, res) => {
  try {
    const { vendorId } = req.params;
    
    const prices = await Product.getProductPrices(vendorId);
    
    res.status(200).json({
      success: true,
      data: prices
    });
  } catch (error) {
    console.error('Error fetching product prices:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product prices',
      error: error.message
    });
  }
};

exports.recordProduction = async (req, res) => {
  try {
    const productionData = req.body;
    
    const result = await Product.recordProduction(productionData);
    
    res.status(200).json({
      success: true,
      message: 'Production recorded successfully'
    });
  } catch (error) {
    console.error('Error recording production:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record production',
      error: error.message
    });
  }
};

exports.getStockData = async (req, res) => {
  try {
    const stockData = await Product.getStockData();
    
    res.status(200).json({
      success: true,
      data: stockData
    });
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stock data',
      error: error.message
    });
  }
};
