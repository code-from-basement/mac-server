const mongoose = require("mongoose");

const userFavSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    favoriteList: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userFavSchema);
module.exports = User;
