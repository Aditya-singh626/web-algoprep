// Import model
const UserModel = require("../models/User");

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
      return res
        .status(400)
        .json({ message: "Validation error", error: err.message });
    }

    // Handle duplicate key error (like duplicate email)
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Duplicate field value", error: err.message });
    }

    // Other errors
    res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
};

module.exports = {
  createUser,
};
