import express from "express";
import {
  createOrder,
  verifyPayment
} from "../controllers/paymentController.js";

const router = express.Router();

// POST /api/payment/order
router.post("/order", createOrder);

// POST /api/payment/verify
router.post("/verify", verifyPayment);

export default router;
