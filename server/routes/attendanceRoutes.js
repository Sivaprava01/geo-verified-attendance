import express from "express";
import Attendance from "../models/Attendance.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
}

// POST /api/attendance/mark
router.post("/mark", verifyToken, async (req, res) => {
  try {
    const { name, rollNo, date, time, status, location } = req.body;
    if (!name || !rollNo || !date || !time)
      return res.status(400).json({ message: "Missing required fields" });

    const newRecord = new Attendance({
      userId: req.userId,
      name,
      rollNo,
      date,
      time,
      status,
      location,
    });
    await newRecord.save();

    res.status(201).json({ message: "Attendance marked successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/attendance/all — view all records
router.get("/all", async (req, res) => {
  try {
    const records = await Attendance.find().sort({ _id: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching records" });
  }
});

export default router;
