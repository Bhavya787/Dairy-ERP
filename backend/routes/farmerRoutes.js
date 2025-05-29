const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');

// Register a new farmer
router.post('/register', farmerController.registerFarmer);

// Get all farmers data
router.get('/', farmerController.getAllFarmers);

// Pay a farmer
router.post('/pay', farmerController.payFarmer);

module.exports = router;
