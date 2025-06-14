const mongoose = require('mongoose');

const dbConnect = () => {
  const uri = process.env.DB_URI;
  if (!uri) {
    console.error('❌ DB_URI not found in config.env');
    process.exit(1);
  }

  mongoose
    .connect(uri)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      process.exit(1);
    });
};

module.exports = dbConnect;




