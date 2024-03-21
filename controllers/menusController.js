const express = require("express");
const app = express();
app.use(express.json());
const Menu = require("../models/menuModel");

// Controllers to get all menus
exports.getAllMenus = async (req, res) => {
  try {
    const allMenus = await Menu.find();

    const uniqueCategories = [...new Set(allMenus.map((item) => item.category))];
    res.status(200).json({
      status: "success",
      data: { allMenus: allMenus, uniqueCategories: uniqueCategories },
    });
  } catch (err) {
    res.status(404).json({ status: "failed", message: "error message , goooz from backend" });
    console.log(err);
  }
};

// Controllers to get menu by id
exports.patchMenuById = async (req, res) => {
  try {
    const updatedMenu = await Menu.findById(req.params.id);
    console.log(updatedMenu);
    res.status(201).json({
      status: "success",
      data: { allMenu: updatedMenu },
      message: "Menu updated successfully",
    });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};
