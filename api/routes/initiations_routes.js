const express = require("express");
const controller = require("../controllers/initiations_controller");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");
const cacheMiddlewares = require("../cache/cache_middleware");

//Define express router
let router = express.Router();

router.get('/', cacheMiddlewares(200),controller.getAllInitiations);

router.get('/:id/number-places-left', cacheMiddlewares(200), controller.getNbPlacesLeft);

router.post('/:idInit/reservations', cacheMiddlewares(200),controller.addReservation);

router.delete('/:idInit', cacheMiddlewares(200), controller.deleteInitiation);

router.post('/', cacheMiddlewares(200), controller.addInitiation);

module.exports = router;