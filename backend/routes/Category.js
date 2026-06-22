const express = require("express");
const router = express.Router();
const categoryController = require("../controller/Category");
const { auth } = require("../middleware/auth");

// Create New Category
router.post(
  "/createCategory",
  auth("admin"),
  categoryController.createCategory,
);

// Get All Categories
router.get("/getCategories", auth("admin"), categoryController.getCategory);

module.exports = router;
