import express from "express";
import {
  generateCertificate,
  getCertificates,
  getCertificatesByUser
} from "../controllers/certificateController.js";

const router = express.Router();

// POST /api/certificates/generate
router.post("/generate", generateCertificate);

// GET /api/certificates
router.get("/", getCertificates);

// GET /api/certificates/user/:userId
router.get("/user/:userId", getCertificatesByUser);

export default router;
