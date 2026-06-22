const express = require("express");
const Book = require("../model/Book");

// Create New Book
exports.createBook = async (req, res) => {
  try {
    const imageUrl = req?.file?.filename;
    const {
      title,
      author,
      description,
      price,
      stock,
      isFeatured,
      category,
      isOnSale,
      discountPercentage,
    } = req.body;
    if (!title || !price || !stock || !description || !author) {
      return res.status(401).json({ message: "All Feildes Required!" });
    }
    const book = await new Book({
      title,
      price,
      stock,
      description,
      author,
      category,
      isOnSale,
      isFeatured,
      discountPercentage,
      imageUrl,
    });
    await book.save();
    return res.status(201).json({ message: "Create Book Successfully", book });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Create Book is Failed!", error: error.message });
  }
};

// Get All Books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("category", "name");
    if (!books) {
      return res.status(403).json({ message: "Books not Found!" });
    }
    return res.status(201).json({ message: "Gat Books Successfully ", books });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Get Books is Failed!", error: error.message });
  }
};

// Get Book By ID
exports.getBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId).populate("category", "name");
    if (!book) {
      return res.status(403).json({ message: "Book not Fount!" });
    }
    return res.status(201).json({ message: "Book Get Successfully", book });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Faild Get Book!", error: error.message });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookInfoBody = req.body;
    const book = await Book.findByIdAndUpdate(bookId, bookInfoBody, {
      new: true,
    }).populate("category", "name");
    if (!book) {
      return res.status(403).json({ message: "Book not Fount!" });
    }
    return res.status(201).json({ message: "Book Updated Successfully", book });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Faild Update Book!", error: error.message });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      return res.status(403).json("Book not Found!");
    }
    return res.status(201).json({ message: "Book Deleted Successfully" });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Deleted Book id Failed!", error: error.message });
  }
};
