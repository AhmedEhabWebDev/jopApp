import mongoose from "mongoose";

export const connection_db = async () => {
  try {
    // connect DB
    await mongoose.connect(process.env.CONNECTION_DB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};