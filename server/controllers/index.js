import { User } from "../database/index.js";
import jwt from "jsonwebtoken";
import "../config/env.js";

export async function handleSignin(req, res, next) {
  try {
    const { username, password } = req.body;
    console.log({ username, password });

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const isPasswordOk = user.verifyPassword(password);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    return res.json({ message: "success", token });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "internal server error", code: 500 });
  }
}

export async function handleSignup(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = new User({
      username,
      password,
    });

    await user.save();
    res.json({
      message: "success",
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({
        message: "user already exists",
      });
    } else {
      console.log(err.message);
      res.status(500).json({
        message: "internal server error",
      });
    }
  }
}

export async function authenticateReq(req, res, next) {
  try {
    const authHeader = req.header("authorization");

    if (!authHeader) {
      req.user = null;
      req.isAuthinticated = false;
      return next();
    }

    const userID = jwt.verify(
      authHeader.split("Bearer ")[1],
      process.env.JWT_SECRET
    ).id;

    if (!userID) {
      req.user = null;
      req.isAuthinticated = false;
      return next();
    }

    const user = await User.findById(userID);

    if (!user) {
      req.user = null;
      req.isAuthinticated = false;
      return next();
    }

    req.user = user;
    req.isAuthinticated = true;
    return next();
  } catch (err) {
    console.log(err.message);

    req.user = null;
    req.isAuthinticated = false;
    return next();
  }
}
