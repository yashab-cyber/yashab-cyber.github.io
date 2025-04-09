import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import "./auth/passport.js"; // Google Strategy config
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import paymentRoutes from "./routes/payment.js";
import certificateRoutes from "./routes/certificate.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(morgan("dev"));

// Express Session
app.use(session({
  secret: process.env.JWT_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/api/contact", contactRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error("MongoDB connection error:", err));
