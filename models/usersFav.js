const mongoose = require("mongoose");

const userFavSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    favoriteList: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const UserFav = mongoose.model("usersfavs", userFavSchema);
module.exports = UserFav;
