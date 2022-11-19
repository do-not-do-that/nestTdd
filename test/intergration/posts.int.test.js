const request = require("supertest");
const app = require("../../server");
const newPost = require("../data/new-post");

it("POST /api/posts", async () => {
  const response = await request(app).post("/api/posts").send(newPost);
  expect(response.statusCode).toBe(201);
  expect(response.body.title).toBe(newPost.title);
});

it("should return 500 on POST /api/posts", async () => {
  const response = await request(app)
    .post("/api/posts")
    .send({ title: "test title" });
  expect(response.statusCode).toBe(500);
  expect(response.body).toStrictEqual({
    message: "Post validation failed: content: Path `content` is required.",
  });
});
