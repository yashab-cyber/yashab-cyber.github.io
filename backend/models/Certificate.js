import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // optional if generating without account
  },
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  issuedOn: {
    type: Date,
    default: Date.now,
  },
  certificateId: {
    type: String,
    unique: true,
    required: true,
  },
}, { timestamps: true });

const Certificate = mongoose.model("Certificate", certificateSchema);
export default Certificate;
