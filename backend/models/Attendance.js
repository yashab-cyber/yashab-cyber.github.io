import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  checkIn: {
    type: Date,
  },
  checkOut: {
    type: Date,
  },
  breaks: [
    {
      start: Date,
      end: Date,
    }
  ],
  totalHours: {
    type: Number, // store in hours (e.g., 7.5)
    default: 0,
  },
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
