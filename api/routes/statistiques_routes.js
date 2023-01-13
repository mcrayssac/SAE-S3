const controller = require("../controllers/controllers");

//Import module de session et cookies
const expressSession = require("express-session");
const express = require("express");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();

router.get("/prestataire/clics/:id", controller.getClicsPrestataire);

router.put("/prestataire/clics/date/:id", controller.putClicsPrestataire);

module.exports = router;