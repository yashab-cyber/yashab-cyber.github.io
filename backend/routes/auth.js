import express from "express";
import { loginWithGoogle } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/google-login
router.post("/google-login", loginWithGoogle);

export default router;
