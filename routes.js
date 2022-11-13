const express = require("express");
const router = express.Router();
const postController = require("./controller/posts");
router.get("/", postController.hello);

module.exports = router;
