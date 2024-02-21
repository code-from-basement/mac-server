const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  kj: {
    type: Number,
    required: true,
  },
  nutrition: {
    type: Object,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  favoriteList: {
    type: Array,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    required: true,
  },
  discount: {
    type: Boolean,
    required: true,
  },
  discount_rate: {
    type: Number,
    required: true,
  },
  related_products: {
    type: Array,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  newItem: {
    type: Boolean,
    required: true,
  },
});

const Menu = mongoose.model("menus", menuSchema);
module.exports = Menu;
