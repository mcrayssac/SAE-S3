const express = require("express");
const controller = require("../controllers/authentification_controllers");

//Define express router
let router = express.Router();

//Routes d'authentification
router.post('/login', controller.login)

router.get('/user', controller.authenticateToken, controller.user)

router.get('/user/create', controller.create)

module.exports = router;