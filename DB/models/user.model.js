// schema
// model
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    recoveryEmail: {
      type: String,
      required: true,
      trim: true,
    },
    DOB: {
      type: Date,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true
    },
    role: {
      type: String,
      default: "User",
      enum: ['User', 'Company_HR']
    },
    status: {
      type: String,
      enum: ['offline', 'online'],
      default: 'offline'
    }
  },
  { timestamps: true, versionKey: "version_key" }
);

const User = mongoose.models.User || model("User", userSchema);
export default User;
