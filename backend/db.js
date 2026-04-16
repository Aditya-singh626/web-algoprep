// Import dependencies
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config(); // load environment variables from .env file
app.use(express.json()); // parse JSON request bodies

// ------------------ DB CONNECTION ------------------
// Make sure you have PASSWORD=yourAtlasPassword in your .env file
// Added "myAppDB" as database name instead of default (otherwise Atlas uses "test")
const dbLink = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.wlaqx8v.mongodb.net/myAppDB?retryWrites=true&w=majority`;

// ------------------ USER SCHEMA RULES ------------------
const schemaRules = {
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true, // creates a unique index
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [6, "password should be at least 6 characters"],
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 6,
    // custom validation to check password match
    validate: [
      function () {
        return this.password === this.confirmPassword;
      },
      "password should be equal to confirm password",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "admin", "feed curator", "moderator"], // only these values allowed
    default: "user",
  },
};

// ------------------ USER SCHEMA ------------------
const userSchema = new mongoose.Schema(schemaRules);

// Pre middleware: runs before saving
userSchema.pre("save", function (next) {
  console.log("pre save was called");
  // remove confirmPassword before saving to DB
  this.confirmPassword = undefined;
  next();
});

// Post middleware: runs after saving
userSchema.post("save", function (doc) {
  console.log("post save was called");
  // NOTE: this does not remove password from DB, only from the object in memory
});

// Create User model (collection will be "users")
const UserModel = mongoose.model("user", userSchema);

// ------------------ PRODUCT SCHEMA ------------------
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "product title is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  category: {
    type: String,
    enum: ["electronics", "clothing", "books", "other"],
    default: "other",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Product model (collection will be "products")
const ProductModel = mongoose.model("product", productSchema);

// ------------------ CONTROLLERS ------------------
const createUser = async function (req, res) {
  try {
    const userObject = req.body;
    const user = await UserModel.create(userObject);
    console.log("user created successfully:", user);

    // Hide sensitive fields before sending response
    user.password = undefined;

    res.status(201).json(user);
  } catch (err) {
    console.error(err);

    // Handle validation errors
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", error: err.message });
    }

    // Handle duplicate key error (like duplicate email)
    if (err.code === 11000) {
      return res.status(400).json({ message: "Duplicate field value", error: err.message });
    }

    // Other errors
    res.status(500).json({ message: "internal server error", error: err.message });
  }
};

const createProduct = async function (req, res) {
  try {
    const productObject = req.body;
    const product = await ProductModel.create(productObject);
    console.log("product created successfully:", product);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", error: err.message });
    }
    res.status(500).json({ message: "internal server error", error: err.message });
  }
};

// ------------------ ROUTES ------------------
app.post("/user", createUser);
app.post("/product", createProduct);

// ------------------ DB CONNECTION ------------------
mongoose
  .connect(dbLink)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.error("DB connection error:", err));

// ------------------ SERVER START ------------------
app.listen(3000, function () {
  console.log("server is running at port 3000");
});
