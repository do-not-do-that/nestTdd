const express = require("express");
const router = express.Router();
const postController = require("./controller/posts");

router.post("/", postController.createPost);
router.get("/", postController.getPosts);

module.exports = router;
