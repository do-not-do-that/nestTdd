const postModel = require("../models/Post");

exports.createPost = (req, res, next) => {
  postModel.create(req.body);
};
