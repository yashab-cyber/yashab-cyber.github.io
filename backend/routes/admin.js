import express from "express";
import User from "../models/User.js";
import Contact from "../models/Contact.js";
import Certificate from "../models/Certificate.js";
import Attendance from "../models/Attendance.js";

const router = express.Router();

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Get all contact messages
router.get("/contacts", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

// Get all certificates
router.get("/certificates", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issuedOn: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: "Error fetching certificates" });
  }
});

// Get all attendance records
router.get("/attendance", async (req, res) => {
  try {
    const records = await Attendance.find().populate("userId").sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance" });
  }
});

export default router;
