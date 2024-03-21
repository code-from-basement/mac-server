const express = require("express");

const app = express();
app.use(express.json());
const menusController = require("../controllers/menusController");

const router = express.Router();

router.route("/").get(menusController.getAllMenus);
router.route("/:id").get(menusController.patchMenuById);

module.exports = router;
