import express from "express";
import {
  checkIn,
  checkOut,
  getAttendanceByUser,
  getAllAttendance
} from "../controllers/attendanceController.js";

const router = express.Router();

// POST /api/attendance/check-in
router.post("/check-in", checkIn);

// POST /api/attendance/check-out
router.post("/check-out", checkOut);

// GET /api/attendance/user/:userId
router.get("/user/:userId", getAttendanceByUser);

// GET /api/attendance/all
router.get("/all", getAllAttendance); // Admin use

export default router;
