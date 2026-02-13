import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Driver from "../models/Driver.js";

export const registerUser = async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;

    if (!name || !phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing =
      role === "driver"
        ? await Driver.findOne({ phone })
        : await User.findOne({ phone });

    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "driver") {
      await Driver.create({ name, phone, password: hashedPassword });
      return res.status(201).json({ message: "Driver registered successfully" });
    }

    await User.create({ name, phone, password: hashedPassword });
    return res.status(201).json({ message: "Passenger registered successfully" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Register failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { phone, password, role } = req.body;

    if (!phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const account =
      role === "driver"
        ? await Driver.findOne({ phone })
        : await User.findOne({ phone });

    if (!account) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: account._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role,
      user: {
        id: account._id,
        name: account.name,
        phone: account.phone
      }
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
};
