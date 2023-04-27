const express = require("express");
const controller = require("../controllers/reservation_controller");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();
const cacheMiddlewares = require("../cache/cache_middleware");


router.post('/courses', cacheMiddlewares(200), controller.addReservationCourse);

module.exports = router;