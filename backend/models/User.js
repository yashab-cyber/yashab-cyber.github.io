import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String, // URL from Google or uploaded
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'employee'],
    default: 'user',
  },
  googleId: {
    type: String, // For users logging in with Google
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
