const express = require("express");
const app = express();
app.use(express.json());
const User = require("../models/usersFav");

// POST
exports.newFavItem = async (req, res) => {
  const { username, favoriteList } = req.body;

  const allUsername = await User.find();
  const findUsername = await User.findOne({ username: username });
  console.log(username, favoriteList, findUsername);
  try {
    const newUserFav = new User({
      username,
      favoriteList,
    });
    if (!findUsername) {
      await newUserFav.save();
      res.status(201).json({
        status: "new user has been created in database!",
        data: { username: newUserFav.username, favoriteList: newUserFav.favoriteList },
      });
    } else {
      res.status(200).json({
        status: "success",
        data: { username: findUsername.username, favoriteList: findUsername.favoriteList },
      });

      // username.favoriteList.push(...favoriteList);
      // await username.save();
      // res.status(201).json({
      //   success: "success",
      //   data: [...new Set(username.favoriteList)],
      // });
    }
  } catch (err) {
    res.status(403).json({ status: "failedx", message: err.message });
  }
};

// GET
exports.getAllFavItems = async (req, res) => {
  console.log(username);
  try {
    // if user can't find in the database
    // if user can find in the database
  } catch (err) {
    res.status(404).json({
      status: "failed ...",
      message: err.message,
    });
  }
};
