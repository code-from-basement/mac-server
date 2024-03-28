const express = require("express");
const app = express();
app.use(express.json());
const router = express.Router();

const menusController = require("../controllers/menusController");

router.route("/").get(menusController.getAllMenus);
router.route("/:id").get(menusController.patchMenuById);

module.exports = router;
