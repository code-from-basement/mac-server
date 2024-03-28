const express = require("express");
const app = express();
app.use(express.json());
const UserFav = require("../models/usersFav");

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

exports.getAllFavItems = async (req, res) => {
  try {
    const allFavItems = await UserFav.find();

    res.status(200).json({
      status: "message",
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
