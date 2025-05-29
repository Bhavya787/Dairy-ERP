const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Get overhead data
router.get('/overhead', expenseController.getOverheadData);

// Add overhead expense
router.post('/overhead', expenseController.addOverheadExpense);

// Get overhead details
router.get('/overhead/details', expenseController.getOverheadDetails);

module.exports = router;
