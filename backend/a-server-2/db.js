const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const dbLink = `mongodb+srv://admin:bxSyvQNqY9iclvIM@test.0skgdx3.mongodb.net/?appName=Test`;
console.log(dbLink);

mongoose
  .connect(dbLink)
  .then(function (connection) {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));
