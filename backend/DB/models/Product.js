// Import dependencies
const mongoose = require("mongoose");

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

module.exports = ProductModel;
