const express = require("express");
require("dotenv").config();
const PORT = 5000;

const app = express();
const productRoutes = require("./routes");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDb Connected..."))
  .catch((err) => console.log(err));

app.use("/api/products", productRoutes);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world");
});

app.listen(PORT);
console.log("Running on port " + PORT);
