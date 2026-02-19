const express = require("express");
// const cors = require("cors");
const fs = require("fs");
const { json } = require("stream/consumers");
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
  const post = jsonPosts.posts[id-1];
  if (post) {
    post.title = title;
    post.body = bodytext;
    res.status(200).json(post);
  }
}
function deletepost(req, res) {
  const id = req.params.posteId;
  if(id){
    jsonPosts.posts.splice(id-1,1);
    const postarr = jsonPosts.posts;
    res.status(200).json({postarr});
  }else{
    json({
      message:"post not found"
    })
  }
}

// app.use(cors());
// app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/posts", getAllPostsHandler);
app.get("/posts/:posteId", getbyId);
app.patch("/posts/:posteId", update);
app.delete("/posts/:posteId",deletepost);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
