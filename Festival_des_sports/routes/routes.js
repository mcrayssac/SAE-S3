const express = require("express");
const controller = require("../controllers/controllers");

var router = express.Router();

//...
// --------- PUBLIC
router.get("/courses", controller.courses);

router.get("/association", controller.association);

router.get("/signup", controller.signup)

router.get("/login", controller.login)

router.get("/home", controller.home)

// --------- PRESTATAIRE
router.get("/restaurants", controller.restaurants);

router.get("/clubs", controller.clubs);

router.post("/club", controller.club);



router.get("/surnameName", controller.surnameName)

module.exports = router;
