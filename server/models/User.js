// server/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    rollNo: { type: String } // optional, for student roll number
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
