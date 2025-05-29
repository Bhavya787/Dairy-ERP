const Milk = require('../models/Milk');

exports.buyMilk = async (req, res) => {
  try {
    const { FID, Quantity, Amount } = req.body;
    
    // Validate input
    if (!FID || !Quantity || !Amount) {
      return res.status(400).json({ 
        success: false, 
        message: 'Farmer ID, quantity, and amount are required' 
      });
    }
    
    if (isNaN(Quantity) || Quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a positive number'
      });
    }
    
    if (isNaN(Amount) || Amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number'
      });
    }
    
    const result = await Milk.buyMilk(FID, Quantity, Amount);
    
    res.status(200).json({
      success: true,
      message: 'Milk purchase recorded successfully'
    });
  } catch (error) {
    console.error('Error recording milk purchase:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record milk purchase',
      error: error.message
    });
  }
};

exports.milkBifurcation = async (req, res) => {
  try {
    const { looseMilk, milkForProduct } = req.body;
    
    // Validate input
    if (looseMilk === undefined || milkForProduct === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Loose milk and milk for product values are required' 
      });
    }
    
    if (isNaN(looseMilk) || looseMilk < 0) {
      return res.status(400).json({
        success: false,
        message: 'Loose milk must be a non-negative number'
      });
    }
    
    if (isNaN(milkForProduct) || milkForProduct < 0) {
      return res.status(400).json({
        success: false,
        message: 'Milk for product must be a non-negative number'
      });
    }
    
    const result = await Milk.milkBifurcation(looseMilk, milkForProduct);
    
    res.status(200).json({
      success: true,
      message: 'Milk bifurcation recorded successfully'
    });
  } catch (error) {
    console.error('Error recording milk bifurcation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record milk bifurcation',
      error: error.message
    });
  }
};
