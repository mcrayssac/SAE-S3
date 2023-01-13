const express = require("express");
const controller = require("../controllers/controllers");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();

// -------- ORGA
router.get("/", controller.getAllOrganisateur);
/**
 * @swagger
 * /organisateur:
 *   get:
 *      description: Get organisateur account
 *      tags:
 *          - ORGANISATEUR
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

module.exports = router;