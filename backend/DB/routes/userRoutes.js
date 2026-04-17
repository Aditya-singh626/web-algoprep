// Import dependencies
const express = require("express");
const { createUser } = require("../controller/userController");

const userRouter = express.Router();

// Routes
userRouter.post("/", createUser);

module.exports = userRouter;
