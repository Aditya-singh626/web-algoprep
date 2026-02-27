const express = require("express");
const findObject = require("./function");
const hasKeyValue = require("./function");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
// const cors = require("cors");
const fs = require("fs");

const { json } = require("stream/consumers");
const { getCallSites } = require("util");

const app = express();
// app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const content = fs.readFileSync("posts.json", "utf-8");
const jsonPosts = JSON.parse(content);


// all handlers functions
function getAllPostsHandler(req, res) {
  try {
    console.log("Recieved get Request");
    res.status(200).json(jsonPosts);
  } catch (err) {
    res.status(500).json({
      message: "internal server error",
    });
  }
}
function getbyId(req, res) {
  console.log("Recieved get Request");
  const id = req.params.posteId;
  const post = jsonPosts.posts[id - 1];
  if (post) {
    res.status(200).json(post);
  }
}
function update(req, res) {
  const id = req.params.posteId;
  const title = req.body.head;
  const bodytext = req.body.text;
  const post = jsonPosts.posts[id - 1];
  if (post) {
    post.title = title;
    post.body = bodytext;
    res.status(200).json(post);
  }
}
function deletepost(req, res) {
  const id = req.params.posteId;
  const postarr = jsonPosts.posts;
  if (hasKeyValue(postarr, "id", id)) {
    postarr.splice(id - 1, 28);
    res.status(200).json({ message: "post deleted" });
  } else {
    res.status(404).json({ message: "post not found" });
  }
}

//routes
// app.use(cors());
app.get("/posts", getAllPostsHandler);
app.get("/posts/:posteId", getbyId);
app.patch("/posts/:posteId", update);
app.delete("/posts/:posteId", deletepost);
app.get("/posts/:posteId/comments", (req, res) => {
  const id = req.params.posteId;
  const post = jsonPosts.posts[id - 1];
});


// to connec to the database
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const dbLink = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@test.0skgdx3.mongodb.net/?appName=Test`;
console.log(dbLink);
mongoose
  .connect(dbLink)
  .then(function (connection) {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

// server starting
  const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
