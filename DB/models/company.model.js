// schema
// model
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      unique:true,
      required: true,
      trim: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    numberOfEmployees: {
      type: Number,
      required: true,
      min:11,
      max:20
    },
    companyEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    companyHR: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true, versionKey: "version_key" }
);

const Company = mongoose.models.Company || model("Company", companySchema);
export default Company;