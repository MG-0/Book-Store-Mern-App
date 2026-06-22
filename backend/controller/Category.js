const express = require("express");
const Category = require("../model/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) res.status(400).json({ message: "Name Required" });

    const category = await new Category({
      name,
    });
    await category.save();
    return res
      .status(201)
      .json({ message: "Category Created Successfully", category });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Create Category is Failed!", error: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(403).json({ message: "Categories not Found!" });
    }
    return res
      .status(201)
      .json({ message: "Categories Fetched Successfully", categories });
  } catch (error) {
    return res.status(401).json({
      message: "Failed Get Category !",
      error: error.message,
    });
  }
};
