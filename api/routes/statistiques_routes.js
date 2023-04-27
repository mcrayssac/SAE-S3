const controller = require("../controllers/stats_controller");

//Import module de session et cookies
const expressSession = require("express-session");
const express = require("express");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();
const cacheMiddlewares = require("../cache/cache_middleware");


router.get("/prestataire/clics/:id", cacheMiddlewares(200), controller.getClicsPrestataire);

router.put("/prestataire/clics/date/:id", cacheMiddlewares(200), controller.putClicsPrestataire);

module.exports = router;