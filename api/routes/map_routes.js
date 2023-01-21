const express = require("express");
const controller = require("../controllers/map_controller");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();

// --------- MAP
router.get("/stands", controller.getStands);

router.get("/contraintes", controller.getContraintes)
/**
 * @swagger
 * /map/contraintes:
 *   get:
 *      description: Get all contraintes
 *      tags:
 *          - MAP
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/stands/contraintes", controller.getContraintesByStand)
/**
 * @swagger
 * /map/stands/contraintes:
 *   get:
 *      description: Get all stands contraintes
 *      tags:
 *          - MAP
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/stands/all", controller.getAllStands);
/**
 * @swagger
 * /map/stands/all:
 *   get:
 *      description: Get all stands
 *      tags:
 *          - MAP
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/prestataires", controller.getAllPrestataires);
/**
 * @swagger
 * /prestataires:
 *   get:
 *      description: Get all prestataires
 *      tags:
 *          - PRESTATAIRE
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/typePresta", controller.getTypeCaracteristiquesPresta);
/**
 * @swagger
 * /map/typePresta:
 *   get:
 *      description: Get all prestataire type
 *      tags:
 *          - MAP
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/caracteristiques", controller.getCaracteristiques);
/**
 * @swagger
 * /map/caracteristiques:
 *   get:
 *      description: Get all caracteristiques
 *      tags:
 *          - MAP
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/type", controller.getTypes);
/**
 * @swagger
 * /map/type:
 *   get:
 *      description: Get all types
 *      tags:
 *          - MAP
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.put("/presta/stand/:idPresta", controller.updateStandId)

router.get('/courses', controller.getCourses)


module.exports = router;
