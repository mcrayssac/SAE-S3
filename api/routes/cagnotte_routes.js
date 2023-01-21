const express = require("express");
const controller = require("../controllers/prestataires_controllers");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();

router.get("/", controller.getCagnotte);

module.exports = router;