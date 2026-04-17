// Import dependencies
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(express.json()); // parse JSON request bodies
app.use(cookieParser()); // parse cookies

// Routes
app.use("/user", userRouter);
app.use("/product", productRouter);

// Connect to DB
connectDB();

// Export app for testing or further use
module.exports = app;

// Start server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function () {
    console.log(`server is running at port ${PORT}`);
  });
}
