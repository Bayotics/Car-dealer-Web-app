const express = require('express');
const router = express.Router();

const PricesCtrl = require('../controllers/prices');

router.get('', PricesCtrl.getPrices);

module.exports = router;
