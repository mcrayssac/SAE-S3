const express = require("express");
const controller = require("../controllers/controllers");

//Import module de session et cookies
const expressSession = require("express-session");
    cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();


// --------- PUBLIC
router.get("/categories/:nomCategorie", controller.getCategorie);

router.get("/categories", controller.getCategories);

router.get("/prestataires/:nomPrestataire", controller.getPrestataire);


// --------- PRESTATAIRE


module.exports = router;
