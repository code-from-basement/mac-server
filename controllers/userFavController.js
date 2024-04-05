const express = require("express");
const app = express();
app.use(express.json());
const UserFav = require("../models/usersFav");

// POST
exports.newFavItem = async (req, res) => {
  const { username, favoriteList } = req.body;

  const allUsername = await UserFav.find();
  const findUsername = await UserFav.findOne({ username: username });
  try {
    if (!findUsername) {
      const newUserFav = new UserFav({
        username,
        favoriteList,
      });

      await newUserFav.save();

      res.status(201).json({
        status: "new user has been created in database!",
      });
    }
    if (findUsername) {
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
    res.status(404).json({ status: "failed", message: err.message });
  }
};

// GET
exports.getAllFavItems = async (req, res) => {
  const { paramsUsername } = req.params;
  const { username } = req.body;
  console.log(username);
  try {
    const findUser = await UserFav.findOne({ username: username });

    // if user can't find in the database
    if (!findUser) {
    }
    // if user can find in the database
  } catch (err) {
    res.status(404).json({
      status: "failed ...",
      message: err.message,
    });
  }
};
