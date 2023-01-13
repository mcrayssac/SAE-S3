const express = require("express");
const controller = require("../controllers/controllers");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();

router.get("/:nomCompetition", controller.getResultats);
/**
 * @swagger
 * /resultats/{nomCompetition}:
 *   get:
 *      description: Get a competition results by name
 *      tags:
 *          - COMPETITION
 *      parameters:
 *          - in: path
 *            name: nomCompetition
 *            type: string
 *            required: true
 *            example: natation
 *            description: Name of the competition
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

module.exports = router;