const express = require("express");
const controller = require("../controllers/demos_controller");
const prestaController = require("../controllers/prestataires_controllers")

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();
const cacheMiddlewares = require("../cache/cache_middleware");

router.get('/', cacheMiddlewares(200), controller.getAllDemos);

router.get('/:id/number-places-left', cacheMiddlewares(200), controller.getNbPlacesLeft);

router.post('/:idDemo/reservations', cacheMiddlewares(200), controller.addReservation);

router.delete('/:idDemo', cacheMiddlewares(200), controller.deleteDemo);

router.post('/',cacheMiddlewares(200), controller.addDemo);

router.put('/:idDemo', controller.updateDemo);

router.get("/prestataires", prestaController.getAllPrestataires)

router.post("/orga", controller.addOrgaDemo)

module.exports = router;