const express = require("express");
const app = express();
app.use(express.json());
const User = require("../models/usersFav");

// POST
exports.newFavItem = async (req, res) => {
  const { username, favoriteList } = req.body;

  const allUsername = await User.find();
  const findUsername = await User.findOne({ username: username });
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
    }

    if (findUsername && favoriteList.length > 0) {
      const searchLikedItem = findUsername.favoriteList.filter((item) => item === favoriteList[0]);
      console.log(searchLikedItem);

      // remove like item when the item is already in the list
      if (findUsername.favoriteList.length > 0 && searchLikedItem) {
        console.log("findUsername.favoriteList.length > 0");
        findUsername.favoriteList = findUsername.favoriteList.filter((item) => item !== searchLikedItem[0]);
        await findUsername.save();
        return res.status(200).json({ message: "item removed from favorite list!", data: { favoriteList } });
      }

      // add new like item when user has no favorite in the list
      if (findUsername.favoriteList.length === 0) {
        console.log("findUsername.favoriteList.length === 0");
        findUsername.favoriteList.push(...favoriteList);
        await findUsername.save();
        return res.status(200).json({ message: "item added to favorite list!", data: { favoriteList } });
      }
    }

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
