const express = require("express");
const controller = require("../controllers/reservation_controller");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();

router.post('/courses', controller.addReservationCourse);

module.exports = router;