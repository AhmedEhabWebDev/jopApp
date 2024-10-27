// schema
// model
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const jobSchema = new Schema(
  {
    jobTitle : {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    jobLocation : {
      type: String,
      required: true,
      trim: true
    },
    workingTime : {
      type: String,
      required: true,
      trim: true,
    },
    seniorityLevel : {
      type: String,
      required: true,
      enum: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"]
    },
    jobDescription : {
      type: String,
      required: true
    },
    technicalSkills : [String],
    softSkills : [String],
    addedBy : {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    companyID:{
      type: Schema.Types.ObjectId,
      ref: "Company"
    }
  },
  { timestamps: true, versionKey: "version_key" }
);

const Job = mongoose.models.Job || model("Job", jobSchema);
export default Job;