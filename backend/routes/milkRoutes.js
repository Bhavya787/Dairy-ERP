const express = require('express');
const router = express.Router();
const milkController = require('../controllers/milkController');

// Record milk purchase
router.post('/buy', milkController.buyMilk);

// Record milk bifurcation
router.post('/bifurcation', milkController.milkBifurcation);

module.exports = router;
