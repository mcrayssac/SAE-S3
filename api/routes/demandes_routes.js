const express = require("express");
const controller = require("../controllers/demandes_controller");

//Import module de session et cookies
cookieParser = require("cookie-parser");
const cacheMiddlewares = require("../cache/cache_middleware");

//Define express router
let router = express.Router();

router.get("/prestataires",cacheMiddlewares(200), controller.getDemandesPrestataires);

router.post("/prestataires/:choice",cacheMiddlewares(200), controller.postDemandesPrestataires);

module.exports = router;