const express = require("express");
const app = express();
app.use(express.json());
const User = require("../models/usersFav");

// POST
exports.newFavItem = async (req, res) => {
  const { username, favoriteList } = req.body;

  // all data in diabase
  const allUsername = await User.find();
  // find user in database
  const findUsername = await User.findOne({ username: username });
  try {
    //
    const newUserFav = new User({
      username,
      favoriteList,
    });

    // if user is not in the database
    if (!findUsername && favoriteList.length === 0) {
      await newUserFav.save();
      return res.status(201).json({
        status: "new user has been created in database!",
        data: { username: newUserFav.username, favoriteList: newUserFav.favoriteList },
      });
    }
    // if user is already in the database
    if (findUsername && favoriteList.length === 0) {
      return res.status(200).json({
        message: "here is favorite list of the user!",
        data: findUsername.favoriteList,
      });
    }
    // Logic behind when user LIKE an ITEM
    if (findUsername && favoriteList.length > 0) {
      const searchLikedItem = findUsername.favoriteList.filter((item) => item == favoriteList[0]).length > 0 ? true : false;
      console.log(searchLikedItem, findUsername.favoriteList, favoriteList[0]);

      // REMOVE item when the item is already in the list
      if (findUsername.favoriteList.length > 0 && searchLikedItem) {
        console.log("remove item - existed item !");
        findUsername.favoriteList = findUsername.favoriteList.filter((item) => item !== favoriteList[0]);
        await findUsername.save();
        return res.status(200).json({ message: "item removed from favorite list!", data: findUsername.favoriteList });
      }
      // ADD new item when user HAS Item favorite in the list
      if (findUsername.favoriteList.length > 0 && !searchLikedItem) {
        console.log("add new item - when favorite list is NOT empty!!!");
        findUsername.favoriteList.push(...favoriteList);
        await findUsername.save();
        return res.status(200).json({ message: "New item has been added to favorite list!", data: findUsername.favoriteList });
      }

      // ADD new item when user HAS NO item in the favorite list
      if (findUsername.favoriteList.length === 0) {
        console.log("add new item - when favorite list IS empty!");
        findUsername.favoriteList.push(...favoriteList);
        await findUsername.save();
        return res.status(200).json({ message: "item added to favorite list!", data: findUsername.favoriteList });
      }
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
