const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

// Register a new vendor
router.post('/register', vendorController.registerVendor);

// Get all vendors
router.get('/', vendorController.getAllVendors);

// Set product prices
router.post('/prices', vendorController.setProductPrices);

// Get vendor status
router.get('/status/:id', vendorController.getVendorStatus);

// Record vendor payment
router.post('/payments', vendorController.recordPayment);

// Get vendor transactions
router.get('/transactions/:id', vendorController.getTransactions);

module.exports = router;
