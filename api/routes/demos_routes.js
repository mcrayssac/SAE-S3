const express = require("express");
const controller = require("../controllers/demos_controller");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();

router.get('/', controller.getAllDemos);

router.get('/:id/number-places-left', controller.getNbPlacesLeft);

router.post('/:idDemo/reservations', controller.addReservation);

router.delete('/:idDemo', controller.deleteDemo);

router.post('/', controller.addDemo);

module.exports = router;