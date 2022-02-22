const express = require('express');
const router = express.Router();

const BrandCtrl = require('../controllers/brands');

router.get('', BrandCtrl.getBrands);

module.exports = router;