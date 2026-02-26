const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
