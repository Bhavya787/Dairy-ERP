const express = require('express');
const router = express.Router();
const logisticsController = require('../controllers/logisticsController');

// Get logistics data
router.get('/', logisticsController.getLogisticsData);

// Add logistics expense
router.post('/', logisticsController.addLogisticsExpense);

// Manage trucks
router.post('/trucks', logisticsController.manageTrucks);

// Get truck details
router.get('/trucks', logisticsController.getTruckDetails);

module.exports = router;
