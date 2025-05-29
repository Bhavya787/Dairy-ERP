const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Sell products
router.post('/sell', productController.sellProducts);

// Get product prices
router.get('/prices/:vendorId', productController.getProductPrices);

// Record product production
router.post('/production', productController.recordProduction);

// Get stock management data
router.get('/stock', productController.getStockData);

module.exports = router;
