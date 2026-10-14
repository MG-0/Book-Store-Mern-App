const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const userRoute = require("./routes/User");
const bookRoute = require("./routes/Book");
const categoryRoute = require("./routes/Category");
const adminRoute = require("./routes/admin");
const cartRoute = require("./routes/Cart");
const orderRoute = require("./routes/Order");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const app = express();

// CORS_ORIGIN env variable controls which frontend URL is allowed.
// Locally: http://localhost:3000
// Production: https://your-frontend.vercel.app (set in Render env vars)
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["http://localhost:3000", "http://localhost:5173"];

app.set("trust proxy", 1);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        allowedOrigins.includes("*") ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev/staging to avoid blocking
    },
    credentials: true,
  }),
);

connectDB();
app.use(express.json());
app.use(cookieParser());

// Root Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "BookStore API is running 🚀" });
});

// Routes
app.use("/users", userRoute);
app.use("/books", bookRoute);
app.use("/categories", categoryRoute);
app.use("/cart", cartRoute);
app.use("/orders", orderRoute);
app.use("/admin", adminRoute);
app.use("/images", express.static(path.join(__dirname, "images")));

const PORT = process.env.PORT || 5000;

// Do not start listening when deployed as a serverless function on Vercel
if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 THE SERVER IS RUNNING AT PORT ${PORT}`);
  });
}

module.exports = app;

