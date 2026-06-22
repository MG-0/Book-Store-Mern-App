const express = require("express");
const router = express.Router();
const bookController = require("../controller/Book");
const multer = require("multer");
const { auth } = require("../middleware/auth");

// Upload Image by Multer Processing
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const fieldname = Date.now() + "-" + file.fieldname;
    cb(null, file.fieldname);
  },
});

const upload = multer({ storage: storage });

// Create New Book
router.post(
  "/createBook",
  auth("admin"),
  upload.single("imageUrl"),
  bookController.createBook,
);

// Get All Books
router.get("/getBooks", bookController.getBooks);

// Get Book By ID
router.get("/:id", bookController.getBook);

// Updated Book
router.put("/update/:id", bookController.updateBook);

// deleted Book
router.delete("/delete/:id", bookController.deleteBook);

module.exports = router;
