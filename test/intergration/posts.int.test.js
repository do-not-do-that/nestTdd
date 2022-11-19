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

it("GET /api/posts", async () => {
  const response = await request(app).get("/api/posts");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].title).toBeDefined();
  expect(response.body[0].content).toBeDefined();
});
