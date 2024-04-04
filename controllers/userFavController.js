const express = require("express");
const app = express();
app.use(express.json());
const UserFav = require("../models/usersFav");

// POST
exports.newFavItem = async (req, res) => {
  const { userName, favoriteList } = req.body;
  const newUserFav = new UserFav({
    userName,
    favoriteList,
  });
  const allUsername = await UserFav.find();
  const username = await UserFav.findOne({ userName: userName });
  try {
    if (username) {
      username.favoriteList.push(...favoriteList);
      await username.save();
      res.status(201).json({
        success: "success",
        data: [...new Set(username.favoriteList)],
      });
    }
    if (!username) {
      await newUserFav.save();
      res.status(201).json({
        success: "new user has been created",
      });
    }
  } catch (err) {
    res.status(404).json({ status: "failed", message: err.message });
  }
};

// GET
exports.getAllFavItems = async (req, res) => {
  const { username } = req.params;
  console.log(username);
  try {
    const allFavItems = await UserFav.findOne({ userName: username });

    res.status(200).json({
      status: "success",
      data: {
        allFavItems,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};
