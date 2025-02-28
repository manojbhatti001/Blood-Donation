const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Initialize express
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blood-requests', require('./routes/bloodRequests'));
app.use('/api/donors', require('./routes/donors'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/volunteers', require('./routes/volunteers'));
app.use('/api/locations', require('./routes/locations'));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 