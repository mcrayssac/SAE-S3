const express = require("express");
const controller = require("../controllers/controllers");

//Import module de session et cookies
const expressSession = require("express-session");
    cookieParser = require("cookie-parser");
    connectFlash = require("connect-flash");

var router = express.Router();

//Recommander de ne pas afficher la clé secrete secret_passcode
router.use(cookieParser("secret_passcode"))
//Déterminer une durée de session
const unJour = 1000 * 60 * 60 * 24 //milliseconde
//AJoute au routeur middleware de session
router.use(
    expressSession({
        secret: "secret_passcode", //Clé privée
        cookie: {maxAge: unJour}, resave: false, saveUninitialized: false
    })
);
//Ajoute un middleware
router.use(connectFlash()); //Avec connectFlash on envoie à l'utilisateur les errors/results
router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

//...
// --------- PUBLIC
router.get("/restaurants", controller.restaurants);

router.get("/clubs", controller.clubs);

router.get("/jdadijonbasket", controller.club);


// --------- PRESTATAIRE


module.exports = router;
