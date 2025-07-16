const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('./cron/fetchHistory');
const coinRoutes = require('./routes/coinRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log("database connected");
});

app.use('/api', coinRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



