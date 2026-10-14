const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log(`🚀 MONGO DB IS RUNNING AND CONNECTED TO SERVER`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error(`👉 تأكد من صحة MONGO_URI واسم المستخدم وكلمة المرور في ملف backend/.env`);
  }
};

module.exports = connectDB;

