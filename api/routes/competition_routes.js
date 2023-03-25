const express = require("express");
const controller = require("../controllers/competition_controller");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();

router.get("/", controller.getCompetition);
/**
 * @swagger
 * /competitions:
 *   get:
 *      description: Get all competitions
 *      tags:
 *          - COMPETITION
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.delete("/:id", controller.deleteCompetition)

router.put("/:id", controller.updateCompetition)

// router.post("/", controller.addCompetition)

router.get("/sports", controller.getSports)

module.exports = router;