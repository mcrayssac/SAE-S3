const express = require("express");
const controller = require("../controllers/authentification_controllers");

//Define express router
let router = express.Router();

//Routes d'authentification
router.post('/login', controller.login);

router.post('/user', controller.authenticateToken, controller.user);

router.post('/check/email', controller.checkEmail);

router.post('/user/create', controller.create);

router.delete('/user/delete/:id', controller.userDelete);

module.exports = router;