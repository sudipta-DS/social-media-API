const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user-routes");
const blogRoutes = require("./routes/blog-routes");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

mongoose
  .connect(
    "mongodb+srv://samantasudipta301:Sudipta%4012@cluster0.593pxoy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000);
