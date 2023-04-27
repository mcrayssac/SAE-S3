const express = require("express");
const controller = require("../controllers/prestataires_controllers");

//Import module de session et cookies
cookieParser = require("cookie-parser");
const cacheMiddlewares = require("../cache/cache_middleware");

//Define express router
let router = express.Router();

router.get("/", cacheMiddlewares(200), controller.getCagnotte);

module.exports = router;