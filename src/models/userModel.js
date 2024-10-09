import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "Email already exists, Please provide another email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Date,
    default: Date.now,
  },
  forgotPasswordToken: String,
  forgotPasswordExpire: Date,
  verifyToken: String,
  verifyTokenExpire: Date
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User