const express = require("express");
const controller = require("../controllers/affluence_controller");
const cacheMiddlewares = require("../cache/cache_middleware");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();

router.get("/:id", cacheMiddlewares(200), controller.getAffluence);

router.put("/:id", cacheMiddlewares(200), controller.setAffluence);

module.exports = router;