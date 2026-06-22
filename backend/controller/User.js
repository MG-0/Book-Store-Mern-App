const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// SignUp User
exports.Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(401)
        .json({ message: "Name, Email and Password Are Required!" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashPassword,
      role: "user",
    });
    await user.save();
    const token = jwt.sign(
      { email, id: user._id, role: user.role },
      process.env.JWT_KEY,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User Created Successfully",
      user,
      token,
      role: user.role,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Created user is failed!", error: error.message });
  }
};

// Signin User

exports.Signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password Are Required!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not Found!" });
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(401).json({ message: "incorrect password!" });
    }
    const token = jwt.sign(
      { email, id: user._id, role: user.role },
      process.env.JWT_KEY,
      {
        expiresIn: "1w",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const role = (user.role || "user").trim();
    const redirectedRole = role === "admin" ? "/admin" : "/";

    return res.status(201).json({
      message: "User Signin Succesfully",
      user,
      token,
      role: user.role,
      redirect: redirectedRole,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Signin is Failed!", error: error.message });
  }
};

// Verfiy User token
exports.verify = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    res.status(200).json({
      message: "token valid",
      user: {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
};

// Signout User
exports.Signout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(201).json({ message: "Signout Successfully" });
};

// GET User By ID

exports.GetUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    return res
      .status(201)
      .json({ message: "User Fetching Successfully", user });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "failed fetch user!", error: error.message });
  }
};
