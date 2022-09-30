const express = require("express");
const controller = require("../controllers/controllers");

var router = express.Router();

//...
router.get("/", controller.home)

module.exports = router;
