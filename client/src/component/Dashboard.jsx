import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const fetchData = async () => {
    const res = await fetch('https://crypto-vr-automation.onrender.com/api/coins');
    let data = await res.json();

    setCoins(data);
    setFilteredCoins(data);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = coins.filter((coin) => {
      const matchSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());

      const matchFilter =
        filterType === 'All' ||
        (filterType === 'Gainers' && coin.change24h > 0) ||
        (filterType === 'Losers' && coin.change24h < 0);

      return matchSearch && matchFilter;
    });
    setFilteredCoins(filtered);
  }, [searchTerm, filterType, coins]);

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          📈 Top 10 Cryptocurrencies
        </h1>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or symbol..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Gainers">Gainers</option>
            <option value="Losers">Losers</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Symbol</th>
                <th className="px-6 py-3">Price (USD)</th>
                <th className="px-6 py-3">Market Cap</th>
                <th className="px-6 py-3">24h Change</th>
                <th className="px-6 py-3">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.length > 0 ? (
                filteredCoins.map((coin) => (
                  <tr
                    key={coin.coinId}
                    className="border-t border-gray-200 hover:bg-blue-50 transition duration-200"
                  >
                    <td className="px-6 py-4 font-medium">{coin.name}</td>
                    <td className="px-6 py-4 uppercase">{coin.symbol}</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      ${coin.priceUsd.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">${coin.marketCap.toLocaleString()}</td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {coin.change24h.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(coin.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center px-6 py-4 text-gray-500">
                    No coins match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
