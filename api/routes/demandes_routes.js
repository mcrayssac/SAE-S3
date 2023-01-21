const express = require("express");
const controller = require("../controllers/demandes_controller");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();

router.get("/prestataires", controller.getDemandesPrestataires);

router.post("/prestataires/:choice", controller.postDemandesPrestataires);

module.exports = router;