const express = require("express");
const controller = require("../controllers/demos_controller");
const prestaController = require("../controllers/prestataires_controllers")

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

router.put('/:idDemo', controller.updateDemo);

router.get("/prestataires", prestaController.getAllPrestataires)

router.post("/orga", controller.addOrgaDemo)

module.exports = router;