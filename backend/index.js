const express = require("express");
const fs = require("fs");
const app = express();
console.log("before");
const content = fs.readFileSync("posts.json", "utf-8");
const jsonPosts = JSON.parse(content);

function getAllPostsHandler(req, res) {
  try {
    console.log("Received get Request");
    res.status(200).json(jsonPosts);
  } catch (err) {
    res.status(500).json({
      message: "internal server error",
    });
  }
}

function getPostById(req, res) {
  try {
    const postid = req.params.postId;
    console.log("postId", postid);
    const postsArr = jsonPosts.posts;
    for (let i = 0; i < postsArr.length; i++) {
      if (postsArr[i].id == postid) {
        return res.status(200).json({
          post: postsArr[i],
        });
      }
    }
    res.status(404).json({
      post: "post not found",
    });
  } catch (err) {
    res.status(500).json({
      response: "something went wrong on our end",
    });
  }
}

function createPost(req, res) {
  try {
    console.log("req.body", req.body);

    const postsArr = jsonPosts.posts;
    postsArr.push(req.body);
    fs.writeFileSync("posts.json", JSON.stringify(jsonPosts, null, 2));

    res.status(201).json({
      message: "post created",
      post: req.body,
    });
  } catch (err) {
    res.status(500).json({
      response: "something went wrong on our end",
    });
  }
}

function updatePost(req, res) {
  try {
    const postId = req.params.postId;
    const postsArr = jsonPosts.posts;

    for (let i = 0; i < postsArr.length; i++) {
      if (postsArr[i].id == postId) {
        postsArr[i] = { ...postsArr[i], ...req.body };
        fs.writeFileSync("posts.json", JSON.stringify(jsonPosts, null, 2));
        return res.status(200).json({
          message: "post updated",
          post: postsArr[i],
        });
      }
    }

    res.status(404).json({
      message: "post not found",
    });
  } catch (err) {
    res.status(500).json({
      response: "something went wrong on our end",
    });
  }
}

function deletePost(req, res) {
  try {
    const postId = req.params.postId;
    const postsArr = jsonPosts.posts;

    for (let i = 0; i < postsArr.length; i++) {
      if (postsArr[i].id == postId) {
        postsArr.splice(i, 1);
        fs.writeFileSync("posts.json", JSON.stringify(jsonPosts, null, 2));
        return res.status(200).json({
          message: "post deleted",
        });
      }
    }

    res.status(404).json({
      message: "post not found",
    });
  } catch (err) {
    res.status(500).json({
      response: "something went wrong on our end",
    });
  }
}

app.use(express.json());
app.post("/posts", createPost);
// getAll request
app.get("/posts", getAllPostsHandler);
// get a post
app.get("/posts/:postId", getPostById);
app.patch("/posts/:postId", updatePost);
app.delete("/posts/:postId", deletePost);

// server start
app.listen(3000, function () {
  console.log("server is running at port 3000");
});
console.log("After");
