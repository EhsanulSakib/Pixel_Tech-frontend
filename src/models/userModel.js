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
    type: Boolean,
    default: false,
  },

  userType:{
    type: String,
    default: "user"
  },

  profilePicture: {
    type: String,
    default: "https://i.ibb.co.com/5sh4yhN/CITYPNG-COM-HD-Profile-User-Round-Blue-Icon-Symbol-Transparent-PNG-1000x1000.png"
  },

  address:{
    type: String,
  },

  phoneNumber: {
    type: String
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
  forgotPasswordToken: String,
  forgotPasswordExpire: Date,
  verifyToken: String,
  verifyTokenExpire: Date
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User