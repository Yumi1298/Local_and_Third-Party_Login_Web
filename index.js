const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// 連結MongoDB
mongoose
  .connect("mongodb:/localhost:27017/GoogleDB")
  .then(() => {
    console.log("Connectiog to mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

// 設定Middlewares以及排版引擎
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("Server running on port 8080.");
});
