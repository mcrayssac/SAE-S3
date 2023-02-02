const express = require("express");
const controller = require("../controllers/initiations_controller");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();

router.get('/', controller.getAllInitiations);

router.get('/:id/number-places-left', controller.getNbPlacesLeft);

router.post('/:idInit/reservations', controller.addReservation);

router.delete('/:idInit', controller.deleteInitiation);

router.post('/', controller.addInitiation);

module.exports = router;