const mongoose = require('mongoose');

const CoinHistorySchema = new mongoose.Schema({
  coinId: String,
  name: String,
  symbol: String,
  priceUsd: Number,
  marketCap: Number,
  change24h: Number,
  timestamp: Date,
});

module.exports = mongoose.model('CoinHistory', CoinHistorySchema);