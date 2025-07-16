const express = require('express');
const router = express.Router();
const { getCoins, storeHistory, getCoinHistory } = require('../controllers/coinController');

router.get('/coins', getCoins);
router.post('/history', storeHistory);
router.get('/history/:coinId', getCoinHistory);

module.exports = router;