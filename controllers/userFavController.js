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
  const { paramsUsername } = req.params;
  const { loggedInUsername } = req.body;
  console.log(username);
  try {
    const findUser = await UserFav.findOne({ userName: paramsUsername });

    // if user can't find in the database
    if (!findUser) {
      const newUser = new UserFav({
        username: loggedInUsername,
        favoriteList: [],
      });
      await newUser.save();

      res.status(201).json({
        status: "new user has been created in database!",
      });
    }
    // if user can find in the database
    if (findUser) {
      res.status(200).json({
        status: "success",
        data: {
          allFavItems,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};
