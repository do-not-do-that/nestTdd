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
    await postModel.find({});
  } catch (error) {
    next(error);
  }
};
