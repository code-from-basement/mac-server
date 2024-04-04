const express = require("express");
const app = express();
app.use(express.json());
const router = express.Router();

const userFavController = require("../controllers/userFavController");
router.route("/:username").get(userFavController.getAllFavItems);
router.route("/").post(userFavController.newFavItem);

module.exports = router;
