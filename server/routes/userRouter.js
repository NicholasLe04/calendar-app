const express = require("express");
const bcrypt = require("bcrypt")
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require('dotenv').config({ path: '../config.env' });

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    return res.status(409).json({
      status: 409,
      message: "Username already exists",
    });
  }

  if (!(username && password)) {
    return res.status(400).json({
      state: 400,
      message: "Both username and password required"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username: username,
    password: hashedPassword,
    events: [],
  });

  const token = jwt.sign(
    { user_id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
  );

  user.token = token;

  await user.save();
  res.status(201).json(user);
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate user input
  if (!(username && password)) {
    return res.status(400).json({
      status: 400,
      message: "Missing username or password"
    });
  }

  // Validate if user exist in our database
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );
    // save user token
    user.token = token;
    // user
    return res.status(200).json(user);
  }
  res.status(400).json({
    status: 400,
    message: "Invalid Credentials"
  });
});

const auth = require("../middleware/auth");
userRouter.post("/isloggedin", auth, (req, res) => {
  res.status(200).json({
    "detail": "success"
  });
});

userRouter.get("/events", async (req, res) => {
  const { user_id } = req.body;
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(user_id) });
  res.status(200).json({
    events: user.events
  });
});

module.exports = userRouter;