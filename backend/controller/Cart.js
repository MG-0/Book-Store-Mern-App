const Cart = require('../model/Cart')
const Book = require("../model/Book")

// Get Cart Items 
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        let cart = await Cart.findOne({ user: userId }).populate("items.book", "title price stock imageUrl");
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
            await cart.save();
        }
        return res.status(200).json({ success: true, message: 'Cart Retrieved Successfully!', cart });
    } catch (error) {
        console.log("Cart Retrieved Failed!", error);
        return res.status(500).json({ success: false, message: 'Cart Retrieved Failed!', error: error.message });
    }
}

// Add Item TO Cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId, quantity = 1 } = req.body;

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found!" });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ book: bookId, price: book.price, quantity: quantity });
        }

        // Check stock availability
        if (book.stock < quantity) {
            return res.status(400).json({ success: false, message: "Not enough stock available!" });
        }
        book.stock -= quantity;

        // Recalculate totals
        cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cart.totalAmount = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        await book.save();
        await cart.save();

        // Populate items before returning
        const populatedCart = await Cart.findById(cart._id).populate("items.book", "title price stock imageUrl");

        return res.status(201).json({ success: true, message: 'Added to cart successfully!', cart: populatedCart });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'failed add to cart', error: error.message });
    }
}

// Update Item in Cart
exports.updateCart = async (req, res) => {
    try {
        const { bookId, quantity } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const item = cart.items.find(item => item.book.toString() === bookId);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found in cart!' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found!' });
        }

        const defferentQuantity = quantity - item.quantity;
        if (defferentQuantity > 0) {
            if (book.stock < defferentQuantity) {
                return res.status(400).json({ success: false, message: 'Stock not enough!' });
            }
            book.stock -= defferentQuantity;
        } else {
            book.stock += Math.abs(defferentQuantity);
        }

        item.quantity = quantity;

        // Recalculate totals
        cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cart.totalAmount = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        await cart.save();
        await book.save();

        const populatedCart = await Cart.findById(cart._id).populate("items.book", "title price stock imageUrl");

        return res.status(200).json({ success: true, message: 'Cart Updated Successfully!', cart: populatedCart });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Cart Updating Failed!', error: error.message });
    }
}

// Remove Item from Cart
exports.removeItemFromCart = async (req, res) => {
    try {
        const { bookId } = req.params;
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found!' });
        }

        const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Item not found in cart!' });
        }

        const item = cart.items[itemIndex];
        const book = await Book.findById(bookId);
        if (book) {
            book.stock += item.quantity;
            await book.save();
        }

        cart.items.splice(itemIndex, 1);

        // Recalculate totals
        cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cart.totalAmount = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        await cart.save();

        const populatedCart = await Cart.findById(cart._id).populate("items.book", "title price stock imageUrl");

        return res.status(200).json({ success: true, message: 'Item removed from cart successfully!', cart: populatedCart });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error removing item from cart!', error: error.message });
    }
}

// Clear Cart
exports.clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        let cart = await Cart.findOne({ user: userId });
        if (cart) {
            cart.items = [];
            cart.totalItems = 0;
            cart.totalAmount = 0;
            await cart.save();
        }
        return res.status(200).json({ success: true, message: 'Cart Cleared Successfully!', cart });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to clear cart!', error: error.message });
    }
}