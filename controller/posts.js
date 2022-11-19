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

exports.updatePost = async (req, res, next) => {
  try {
    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true }
    );
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const deletedPost = await postModel.findByIdAndDelete(req.params.postId);

    if (deletedPost) {
      res.status(204).json(deletedPost);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};
