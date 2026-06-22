// BACKEND CHANGE COMMENT:
// This controller handles Order operations. 
// - createOrder: fetches the user's database cart, maps its items, copies pricing, creates the Order, and clears the cart database.
// - getUserOrders: retrieves the list of past orders for the logged-in user, sorting from newest to oldest.
const Order = require("../model/Order");
const Cart = require("../model/Cart");

// Create Order from Cart items
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress || !shippingAddress.name || !shippingAddress.email || !shippingAddress.address || !shippingAddress.city || !shippingAddress.phone) {
      return res.status(400).json({ success: false, message: "All shipping details are required!" });
    }

    // Fetch user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.book");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Your cart is empty!" });
    }

    // Map cart items to order items and calculate prices
    const orderItems = cart.items.map((item) => {
      const book = item.book;
      const price = book.isOnSale 
        ? book.price * (1 - book.discountPercentage / 100) 
        : book.price;

      return {
        book: book._id,
        quantity: item.quantity,
        price: Number(price.toFixed(2)),
      };
    });

    // Create the new Order record
    const order = new Order({
      user: userId,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice: Number(cart.totalAmount.toFixed(2)),
    });

    await order.save();

    // Clear the user's cart items in database
    cart.items = [];
    cart.totalItems = 0;
    cart.totalAmount = 0;
    await cart.save();

    return res.status(201).json({ success: true, message: "Order placed successfully!", order });
  } catch (error) {
    console.error("Order Creation Error:", error);
    return res.status(500).json({ success: false, message: "Failed to place order!", error: error.message });
  }
};

// Retrieve past orders of a logged-in user
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId })
      .populate("items.book", "title imageUrl price")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to retrieve orders!", error: error.message });
  }
};
