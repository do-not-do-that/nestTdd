const express = require("express");
require("dotenv").config();
const PORT = 5000;

const app = express();
const postRoutes = require("./routes");
const mongoose = require("mongoose");
app.use(express.json());

app.use("/api/posts", postRoutes);

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb Connected...^~^"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello, world");
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.listen(PORT);
console.log("Running on port " + PORT);

module.exports = app;
