const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
dotenv.config({ path: "./config.env" });
app.use(express.json());
app.use(cors());
const menusRouter = require("./routers/menusRouter");
const userFavRouter = require("./routers/userFavRouter");
mongoose
  .connect(
    "mongodb+srv://mahyarnafisi:OA3QMx0Tz0o3MOXh@cluster0.xuzng70.mongodb.net/allmenu?retryWrites=true&w=majority"
  )
  .then((con) => {
    console.log("DB connection successful", con.connection._connectionString);
  });

app.use("/api/v1/menus", menusRouter);
app.use("/api/v1/usersfavs", userFavRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
