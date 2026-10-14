const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`🚀 MONGO DB IS RUNNING AND CONNECTED TO SERVER`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error(`👉 تأكد من صحة MONGO_URI واسم المستخدم وكلمة المرور في ملف backend/.env`);
  }
};

module.exports = connectDB;

