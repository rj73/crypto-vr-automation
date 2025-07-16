const cron = require('node-cron');
const axios = require('axios');
const mongoose = require('mongoose');
const CurrentCoin = require('../models/CurrentCoin');
const CoinHistory = require('../models/CoinHistory');
require('dotenv').config();

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

mongoose.connect(process.env.MONGO_URI);

cron.schedule('0 * * * *', async () => {
  try {
    const response = await axios.get(COINGECKO_URL);
    const data = response.data.map(coin => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      priceUsd: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      timestamp: new Date(coin.last_updated),
    }));
    await CoinHistory.insertMany(data);
    console.log('Hourly history saved');
  } catch (error) {
    console.error('Cron job error:', error);
  }
});