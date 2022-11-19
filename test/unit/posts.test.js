const postController = require("../../controller/posts");
const postModel = require("../../models/Post");
const httpMocks = require("node-mocks-http");
const newPost = require("../data/new-post");
const allPosts = require("../data/all-posts");

postModel.create = jest.fn();
postModel.find = jest.fn();
postModel.findById = jest.fn();
postModel.findByIdAndUpdate = jest.fn();
postModel.findByIdAndDelete = jest.fn();

const postId = "49ddkfj394739";
const updatedPost = { title: "updated title", content: "updated content" };
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

  it("should return 200 response code", async () => {
    await postController.getPosts(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    postModel.find.mockReturnValue(allPosts);
    await postController.getPosts(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allPosts);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error finding post data" };
    const rejectedPromise = Promise.reject(errorMessage);
    postModel.find.mockReturnValue(rejectedPromise);
    await postController.getPosts(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("Post Controller getPostById", () => {
  it("should have a getPostById", () => {
    expect(typeof postController.getPostById).toBe("function");
  });

  it("should call PostModel.findById", async () => {
    req.params.postId = postId;
    await postController.getPostById(req, res, next);
    expect(postModel.findById).toBeCalledWith(postId);
  });

  it("should return json body and response code 200", async () => {
    postModel.findById.mockReturnValue(newPost);
    await postController.getPostById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newPost);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return 404 when item doesnt exist", async () => {
    postModel.findById.mockReturnValue(null);
    await postController.getPostById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "error" };
    const rejectedPromise = Promise.reject(errorMessage);

    postModel.findById.mockReturnValue(rejectedPromise);
    await postController.getPostById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe("Post Controller update", () => {
  it("should have an updatePost function", () => {
    expect(typeof postController.updatePost).toBe("function");
  });

  it("should call postModel.findByIdAndUpdate", async () => {
    req.params.postId = postId;
    req.body = updatedPost;
    await postController.updatePost(req, res, next);
    expect(postModel.findByIdAndUpdate).toBeCalledWith(postId, updatedPost, {
      new: true,
    });
  });

  it("should return json body and response code 200", async () => {
    req.params.postId = postId;
    req.body = updatedPost;
    postModel.findByIdAndUpdate.mockReturnValue(updatedPost);
    await postController.updatePost(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updatedPost);
  });

  it("should return 404 when item doesnt exist", async () => {
    postModel.findByIdAndUpdate.mockReturnValue(null);
    await postController.updatePost(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error" };
    const rejectPromise = Promise.reject(errorMessage);
    postModel.findByIdAndUpdate.mockReturnValue(rejectPromise);
    await postController.updatePost(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe("Post Controller Delete", () => {
  it("should have a deletePost function", () => {
    expect(typeof postController.deletePost).toBe("function");
  });

  it("should call PostModel.findByIdAndDelete", async () => {
    req.params.postId = postId;
    await postController.deletePost(req, res, next);
    expect(postModel.findByIdAndDelete).toBeCalledWith(postId);
  });

  it("should return 204 response", async () => {
    let deletedPost = {
      title: "deletedPost",
      content: "it is deleted Post.",
    };
    postModel.findByIdAndDelete.mockReturnValue(deletedPost);
    await postController.deletePost(req, res, next);
    expect(res.statusCode).toBe(204);
    expect(res._getJSONData()).toStrictEqual(deletedPost);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle 404 when item doesnt exist", async () => {
    postModel.findByIdAndDelete.mockReturnValue(null);
    await postController.deletePost(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error deleting" };
    const rejectPromise = Promise.reject(errorMessage);
    postModel.findByIdAndDelete.mockReturnValue(rejectPromise);

    await postController.deletePost(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
