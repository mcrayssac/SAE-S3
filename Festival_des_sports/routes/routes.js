const express = require("express");
const controller = require("../controllers/controllers");

var router = express.Router();

//...
router.get("/association", controller.association);

router.get("/surnameName", controller.surnameName)

router.get("/home", controller.home)

module.exports = router;
