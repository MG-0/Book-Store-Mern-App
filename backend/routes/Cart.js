const express = require('express')
const router = express.Router()
const { AuthCookie } = require('../middleware/auth')
const cartController = require("../controller/Cart")

// Get Items Cart
router.get("/", AuthCookie, cartController.getCart)

// Add To Cart
router.post("/add", AuthCookie, cartController.addToCart)

// Update Item In Cart
router.put("/update", AuthCookie, cartController.updateCart)

// remove item from cart
router.delete("/remove/:bookId", AuthCookie, cartController.removeItemFromCart)

// clear cart
router.delete("/clear", AuthCookie, cartController.clearCart)

module.exports = router;