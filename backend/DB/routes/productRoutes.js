// Import dependencies
const express = require("express");
const { createProduct } = require("../controller/productController");

const productRouter = express.Router();

// Routes
productRouter.post("/", createProduct);

module.exports = productRouter;
