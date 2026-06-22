const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`🚀 MONGO DB IS RUNNING AND CONNECTED TO SERVER`);
  });
};

module.exports = connectDB;
