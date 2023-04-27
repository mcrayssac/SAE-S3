const express = require("express");
const controller = require("../controllers/categories_controller");

//Import module de session et cookies
cookieParser = require("cookie-parser");
const cacheMiddlewares = require("../cache/cache_middleware");

//Define express router
let router = express.Router();

router.get("/:nomCategorie", cacheMiddlewares(200), controller.getCategorie);

router.get("/", cacheMiddlewares(200), controller.getCategories);

module.exports = router;