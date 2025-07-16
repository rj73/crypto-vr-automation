# Crypto Tracker (MERN)
Tracks Top 10 Cryptocurrencies with live prices, auto-refresh, and historical data.

-Features
Dashboard with Name, Symbol, Price, Market Cap, 24h % Change

Auto-refresh every 30 mins

Cron job stores history hourly

🛠 Tech
React • Node.js • Express • MongoDB • node-cron

📌 API Routes
GET /api/coins → Fetch Top 10 coins

POST /api/history → Save current data snapshot

GET /api/history/:coinId → Get historical data
