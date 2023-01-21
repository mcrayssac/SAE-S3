const express = require("express");
const controller = require("../controllers/inscription_controller");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();

router.get("/choix/:type", controller.getInscriptionChoix);

module.exports = router;
