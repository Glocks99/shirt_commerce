const mongoose = require('mongoose');

async function connectDB() {
  const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shirt-store';

  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected to the database");
  })
  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });
  
  await mongoose.connect(dbURI)
}

module.exports = connectDB;