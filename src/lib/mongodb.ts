// src/lib/mongodb.ts

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_CONN;

// Function to connect to MongoDB
async function connectToMongoDB() {
  const mongoURI = MONGODB_URI as string; // Replace with your actual MongoDB URI

  console.log("Connecting to MongoDB");

  try {
    await mongoose.connect(mongoURI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectToMongoDB;
