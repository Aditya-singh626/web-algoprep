// Import dependencies
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // load environment variables from .env file

// ------------------ DB CONNECTION ------------------
// Make sure you have PASSWORD=yourAtlasPassword in your .env file
// Added "myAppDB" as database name instead of default (otherwise Atlas uses "test")
const dbLink = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.wlaqx8v.mongodb.net/myAppDB?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbLink);
    console.log("connected to db");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

module.exports = connectDB;
