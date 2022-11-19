const request = require("supertest");
const app = require("../../server");
const newPost = require("../data/new-post");

let firstPost;
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
  firstPost = response.body[0];
});

it("GET /api/posts/:postId", async () => {
  const response = await request(app).get("/api/posts/" + firstPost._id);
  expect(response.statusCode).toBe(200);
  expect(response.body.title).toBe(firstPost.title);
  expect(response.body.content).toBe(firstPost.content);
});

it("GET id doesnt exist /api/posts/:postId", async () => {
  const response = await request(app).get(
    "/api/posts/6378c1dc34ab6269bf559777"
  );
  expect(response.statusCode).toBe(404);
});

it("PUT /api/posts", async () => {
  const response = await request(app)
    .put("/api/posts/" + firstPost._id)
    .send({ title: "updated title", content: "updated content" });
  expect(response.statusCode).toBe(200);
  expect(response.body.title).toBe("updated title");
  expect(response.body.content).toBe("updated content");
});

it("should return 404 on PUT /api/posts", async () => {
  const response = await request(app)
    .put("/api/posts/" + "6378c1dc34ab6269bf559777")
    .send({ title: "updated title", content: "updated content" });

  expect(response.statusCode).toBe(404);
});

it("DELETE /api/posts", async () => {
  const response = await request(app)
    .delete("/api/posts/" + firstPost._id)
    .send();
  expect(response.statusCode).toBe(204);
});

it("DELETE id doesnt exist /api/posts/:postId", async () => {
  const response = await request(app)
    .delete("/api/posts/" + firstPost._id)
    .send();
  expect(response.statusCode).toBe(404);
});
