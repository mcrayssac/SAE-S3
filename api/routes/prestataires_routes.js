const express = require("express");
const controller = require("../controllers/prestataires_controllers");
const mapController = require("../controllers/map_controller");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();
const cacheMiddlewares = require("../cache/cache_middleware");



router.post("/prestataires/:nomPrestataire/post_commentaire", cacheMiddlewares(200), controller.addCommentaire);

router.get("/prestataires/commentairesDejaPoste/:idPresta/:idPublic", cacheMiddlewares(200), controller.aPosteCommentaire);

// router.get("/courses/classement/:idCourse", controller.getClassementCourse)

// --------- ORGANISATEUR

router.get("/prestataires/:nomPrestataire", cacheMiddlewares(200), controller.getPrestataire);


// --------- PRESTATAIRE
router.get("/prestataires/prestataire/:nomPrestataire", cacheMiddlewares(200), controller.getPrestataire);

router.get("/prestataires/prestataire/getCommentaires/:id_presta", cacheMiddlewares(200), controller.getPrestataireCommentaire);

router.get("/prestataire/:idPrestataire", cacheMiddlewares(200), controller.getPrestataireById);
/**
 * @swagger
 * /prestataire/{idPrestataire}:
 *   get:
 *      description: Get a prestataire by id
 *      tags:
 *          - PRESTATAIRE
 *      parameters:
 *          - in: path
 *            name: idPrestataire
 *            type: integer
 *            required: true
 *            example: 1
 *            description: ID of the prestataire account
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.put("/prestataires", cacheMiddlewares(200), controller.createPrestataire);
/**
 * @swagger
 * /prestataires:
 *   put:
 *      description: Used to create a new prestataire user with the given information
 *      tags:
 *          - PRESTATAIRE
 *      parameters:
 *          - in: body
 *            name: user
 *            schema:
 *              type: object
 *              required: true
 *              properties:
 *                  nom:
 *                      type: string
 *                      example: "Cafet"
 *                  email:
 *                      type: string
 *                      example: "cafet@gmail.com"
 *                  telephone:
 *                      type: string
 *                      example: "06-06-06-06-06"
 *                  site_web:
 *                      type: string
 *                      example: "www.cafet.com"
 *                  passwd:
 *                      type: string
 *                      example: "1234"
 *                  id_type:
 *                      type: integer
 *                      example: 3
 *      responses:
 *          '201':
 *              description: User created successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.delete("/prestataires", cacheMiddlewares(200), controller.deletePrestataire);
/**
 * @swagger
 * /prestataires:
 *   delete:
 *      description:  Used to delete a prestataire account
 *      tags:
 *          - PRESTATAIRE
 *      parameters:
 *          - in: query
 *            name: id_prestataire
 *            type: integer
 *            required: true
 *            example: 25
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.post("/prestataires/:idPrestataire", cacheMiddlewares(200), controller.updatePrestataire);
/**
 * @swagger
 * /prestataires/{idPrestataire}:
 *   post:
 *      description: Used to update a new prestataire user with the given information
 *      tags:
 *          - PRESTATAIRE
 *      parameters:
 *          - in: path
 *            name: idPrestataire
 *            required: true
 *            type: integer
 *            example: 24
 *          - in: body
 *            name: user
 *            schema:
 *              type: object
 *              required: true
 *              properties:
 *                  nom:
 *                      type: string
 *                      example: "Cafeteria"
 *                  email:
 *                      type: string
 *                      example: "cafeteria@gmail.com"
 *                  telephone:
 *                      type: string
 *                      example: "07-06-07-06-07"
 *                  site_web:
 *                      type: string
 *                      example: "www.cafeteria.com"
 *                  passwd:
 *                      type: string
 *                      example: "1234"
 *                  id_type:
 *                      type: integer
 *                      example: 3
 *      responses:
 *          '201':
 *              description: User created successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/prestataires", cacheMiddlewares(200), mapController.getAllPrestataires);
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

module.exports = router;