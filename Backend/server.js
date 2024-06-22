const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const { readdirSync } = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const PORT = process.env.PORT || 3000;

// Load all routes
readdirSync('./routes').map((r) => {
  const route = require(`./routes/${r}`);
  app.use('/api/v1', route);
});

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${process.env.HOST}:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
