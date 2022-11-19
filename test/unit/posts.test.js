const postController = require("../../controller/posts");
const postModel = require("../../models/Post");
const httpMocks = require("node-mocks-http");
const newPost = require("../data/new-post");

postModel.create = jest.fn();
postModel.find = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Post Controller Create", () => {
  beforeEach(() => {
    req.body = newPost;
  });

  it("should have a createPost function", () => {
    expect(typeof postController.createPost).toBe("function");
  });

  it("should call PostModel.create", async () => {
    await postController.createPost(req, res, next);
    expect(postModel.create).toBeCalledWith(newPost);
  });

  it("should return 201 response code", async () => {
    await postController.createPost(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    postModel.create.mockReturnValue(newPost);
    await postController.createPost(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newPost);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "content property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    postModel.create.mockReturnValue(rejectedPromise);
    await postController.createPost(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("Post Controller Get", () => {
  beforeEach(() => {});

  it("should have a getPosts", () => {
    expect(typeof postController.getPosts).toBe("function");
  });

  it("should call PostModel.find({})", async () => {
    await postController.getPosts(req, res, next);
    expect(postModel.find).toHaveBeenCalledWith({});
  });
});
