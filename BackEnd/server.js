const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// Use the middleware for CORS and JSON parsing
app.use(cors());
app.use(express.json());  // or bodyParser.json(), if you're not using Express 4.16.0 or later

// Set up a basic route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Real Estate Tokenization API');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use auth routes for /api/auth endpoint
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
