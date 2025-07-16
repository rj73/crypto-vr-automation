const axios = require('axios');
const CurrentCoin = require('../models/CurrentCoin');
const CoinHistory = require('../models/CoinHistory');

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

exports.getCoins = async (req, res) => {
  try {
    let data = [];

    try {
      const response = await axios.get(COINGECKO_URL);

      data = response.data.map(coin => ({
        coinId: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        priceUsd: coin.current_price,
        marketCap: coin.market_cap,
        change24h: coin.price_change_percentage_24h,
        timestamp: new Date(coin.last_updated),
      }));

      await CurrentCoin.deleteMany({});
      await CurrentCoin.insertMany(data);

    } catch (apiError) {
      console.warn('API failed, using DB data:', apiError.message);
      data = await CurrentCoin.find({});
    }

    res.json(data);
  }catch (error) {
  console.error('Error in getCoins:', error); 
  res.status(500).json({ message: 'Error fetching data', error: error.message });
}
};

exports.storeHistory = async (req, res) => {
  try {
    const coins = await CurrentCoin.find();

    const coinsWithoutId = coins.map(coin => {
      const { _id, ...rest } = coin.toObject();
      return rest;
    });

    await CoinHistory.insertMany(coinsWithoutId);
    res.status(201).json({ message: 'History saved' });
  } catch (error) {
    res.status(500).json({ message: 'Error storing history' });
  }
};

exports.getCoinHistory = async (req, res) => {
  try {
    const { coinId } = req.params;
    const history = await CoinHistory.find({ coinId });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history' });
  }
};
