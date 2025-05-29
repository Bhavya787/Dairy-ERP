const Farmer = require('../models/Farmer');

exports.registerFarmer = async (req, res) => {
  try {
    const { name, mobno, accno, ifsc, branch } = req.body;
    
    // Validate input
    if (!name || !mobno || !accno || !ifsc || !branch) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    const token_id = await Farmer.register(name, mobno, accno, ifsc, branch);
    
    res.status(201).json({
      success: true,
      message: 'Farmer registered successfully',
      token_id
    });
  } catch (error) {
    console.error('Error registering farmer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register farmer',
      error: error.message
    });
  }
};

exports.getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.getAllFarmers();
    
    res.status(200).json({
      success: true,
      data: farmers
    });
  } catch (error) {
    console.error('Error fetching farmers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch farmers',
      error: error.message
    });
  }
};

exports.payFarmer = async (req, res) => {
  try {
    const { token_id, amount_paid } = req.body;
    
    // Validate input
    if (!token_id || !amount_paid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Token ID and amount are required' 
      });
    }
    
    if (isNaN(amount_paid) || amount_paid <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number'
      });
    }
    
    const result = await Farmer.payFarmer(token_id, parseFloat(amount_paid));
    
    res.status(200).json({
      success: true,
      message: result.message,
      amount_paid: result.amount_paid
    });
  } catch (error) {
    console.error('Error paying farmer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process payment',
      error: error.message
    });
  }
};
