// Import model
const ProductModel = require("../models/Product");

const createProduct = async function (req, res) {
  try {
    const productObject = req.body;
    const product = await ProductModel.create(productObject);
    console.log("product created successfully:", product);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", error: err.message });
    }
    res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
};

module.exports = {
  createProduct,
};
