const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[WARNING] MongoDB Connection Failed: ${error.message}`);
    console.warn(`[INFO] Server will continue running in offline/demo mode. Start MongoDB to enable database features.`);
  }
};

module.exports = connectDB;
