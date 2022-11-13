const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  like_cnt: {
    type: Number,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
