// schema
// model
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const applicationSchema = new Schema(
  {
    jobID : {
      type: Schema.Types.ObjectId,
      ref: "Job"
    },
    userID : {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    userTechSkills : [String],
    userSoftSkills  : [String]
  },
  { timestamps: true, versionKey: "version_key" }
);

const App = mongoose.models.Application || model("Application", applicationSchema);
export default App;