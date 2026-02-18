const express = require("express");
// const cors = require("cors");
const fs = require("fs");
const { getCallSites } = require("util");
const app = express();
console.log("before");
const content = fs.readFileSync("posts.json", "utf-8");
const jsonPosts = JSON.parse(content);
function getAllPosts(req, res) {}

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

};
// app.use(cors());
// app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.get("/posts", getAllPostsHandler);
app.get("/posts/:posteId",getbyId);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
