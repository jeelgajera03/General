const Mongoose = require('mongoose');

async function mainDbConnection() {
  const dbUri = 'mongodb://localhost:27017/evont'; // Replace with your actual MongoDB URI
  try {
    await Mongoose.connect(dbUri); // Remove deprecated options
    console.log('MongoDB connection established successfully');
    return Mongoose;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = {
  mainDbConnection,
};