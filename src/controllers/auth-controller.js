import { matchedData, validationResult } from "express-validator";
import { User } from "../models/user.js";
import { hashPassword } from "../helpers/hashPassword.js";
import jwt from "jsonwebtoken";
import { comparePassword } from "../helpers/compare-password.js";

export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = matchedData(req);

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    // password = hashPassword(password)

    const newUser = new User({
      username,
      email,
      password: hashPassword(password),
    });

    await newUser.save();

    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = matchedData(req);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!comparePassword(password, user.password)) {
      return res.status(400).json({ message: "Bad crediantial" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "120m" }
    );

    return res.status(200).send({ token: token });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkAuth = (req, res) => {
  const user = req.user;
  console.log(user);
  res.status(200).json({
    success: true,
    message: "Authenticated",
  });
};
