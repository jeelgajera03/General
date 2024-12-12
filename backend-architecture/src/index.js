// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const router = require('./router');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Routes
app.use('/api/v1/', router);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
