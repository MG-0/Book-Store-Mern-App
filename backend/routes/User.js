const express = require("express");
const router = express.Router();
const userController = require("../controller/User");
const { AuthCookie } = require("../middleware/auth");

// Signup User
router.post("/signup", userController.Signup);

// Signin User
router.post("/signin", userController.Signin);

// verify user token
router.get("/verify", AuthCookie, userController.verify);

// Signout USer
router.post("/signout", userController.Signout);

// Get User By ID
router.get("/:id", userController.GetUser);

module.exports = router;
