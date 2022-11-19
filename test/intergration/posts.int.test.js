const request = require("supertest");
const app = require("../../server");
const newPost = require("../data/new-post");

let firstProduct;
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
  firstProduct = response.body[0];
});

it("GET /api/posts/:postId", async () => {
  const response = await request(app).get("/api/posts/" + firstProduct._id);
  expect(response.statusCode).toBe(200);
  expect(response.body.title).toBe(firstProduct.title);
  expect(response.body.content).toBe(firstProduct.content);
});

it("GET id doesnt exist /api/posts/:postId", async () => {
  const response = await request(app).get(
    "/api/posts/6378c1dc34ab6269bf559777"
  );
  expect(response.statusCode).toBe(404);
});
