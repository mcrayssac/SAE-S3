const express = require("express");
const controller = require("../controllers/categories_controller");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();

router.get("/:nomCategorie", controller.getCategorie);

router.get("/", controller.getCategories);

module.exports = router;