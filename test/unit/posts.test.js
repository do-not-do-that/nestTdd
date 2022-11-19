const postController = require("../../controller/posts");
const postModel = require("../../models/Post");
const httpMocks = require("node-mocks-http");
const newPost = require("../data/new-post");

postModel.create = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("Post Controller Create", () => {
  beforeEach(() => {
    req.body = newPost;
  });

  it("should have a createPost function", () => {
    expect(typeof postController.createPost).toBe("function");
  });

  it("should call PostModel.create", () => {
    postController.createPost(req, res, next);
    expect(postModel.create).toBeCalledWith(newPost);
  });
});
