const express = require("express");
const controller = require("../controllers/affluence_controller");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();

router.get("/:id", controller.getAffluence);

router.put("/:id", controller.setAffluence);

module.exports = router;