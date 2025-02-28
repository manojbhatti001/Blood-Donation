const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || config.get('mongoURI'));
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB; 