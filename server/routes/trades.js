const express = require('express');
const router = express.Router();

const TradesCtrl = require('../controllers/trades');
const AuthCtrl = require('../controllers/auth')

router.get('', TradesCtrl.getTrades);
router.get('/secret', AuthCtrl.onlyAuthUser, TradesCtrl.getSecret);
router.get('/:id', TradesCtrl.getTradeById);

router.post('', AuthCtrl.onlyAuthUser, TradesCtrl.createTrade);
router.post('/:id/join', AuthCtrl.onlyAuthUser, TradesCtrl.joinTrade);
router.post('/:id/leave', AuthCtrl.onlyAuthUser, TradesCtrl.leaveTrade);

router.patch('/:id', AuthCtrl.onlyAuthUser, TradesCtrl.updateTrade)

module.exports = router;