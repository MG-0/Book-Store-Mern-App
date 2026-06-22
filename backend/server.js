const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./routes/User");
const bookRoute = require('./routes/Book')
const categoryRoute = require('./routes/Category')
const adminRoute = require('./routes/admin')
const cartRoute = require('./routes/Cart')
const orderRoute = require('./routes/Order')
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

connectDB();
app.use(express.json())
app.use(cookieParser());
// Routes
app.use("/users", userRoute);
app.use('/books', bookRoute)
app.use('/categories', categoryRoute)
app.use("/cart", cartRoute);
app.use("/orders", orderRoute);
app.use("/admin", adminRoute);
app.use('/images', express.static('images') )

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 THE SERVER IS RUNNING AT PORT ${PORT}`);
});
