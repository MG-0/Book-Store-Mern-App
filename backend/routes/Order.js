// BACKEND CHANGE COMMENT:
// We create the router definitions to map HTTP requests for order creation and retrieving order histories,
// protecting them using the standard `auth()` cookie token middleware.
const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { createOrder, getUserOrders } = require("../controller/Order");

// Route to place an order
router.post("/create", auth(), createOrder);

// Route to retrieve user's order history
router.get("/my-orders", auth(), getUserOrders);

module.exports = router;
