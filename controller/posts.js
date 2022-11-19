const postModel = require("../models/Post");

exports.createPost = async (req, res, next) => {
  try {
    const createdPost = await postModel.create(req.body);
    res.status(201).json(createdPost);
  } catch (error) {
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const allPosts = await postModel.find({});
    res.status(200).json(allPosts);
  } catch (error) {
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.postId);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (error) {
    next(error);
  }
};
