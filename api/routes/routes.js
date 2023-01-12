const express = require("express");
const controller = require("../controllers/controllers");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();


// --------- PUBLIC
router.get("/public", controller.getAllPublic);
/**
 * @swagger
 * /public:
 *   get:
 *      description: Get all public accounts
 *      tags:
 *          - PUBLIC
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/public/:idPublic", controller.getPublicById);
/**
 * @swagger
 * /public/{idPublic}:
 *   get:
 *      description: Get a public account by id
 *      tags:
 *          - PUBLIC
 *      parameters:
 *          - in: path
 *            name: idPublic
 *            type: integer
 *            required: true
 *            example: 1
 *            description: ID of the public account
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/categories/:nomCategorie", controller.getCategorie);

router.get("/categories", controller.getCategories);

router.post("/prestataires/:nomPrestataire/post_commentaire", controller.addCommentaire);

// router.get("/courses/classement/:idCourse", controller.getClassementCourse)

// --------- ORGANISATEUR

router.get("/prestataires/:nomPrestataire", controller.getPrestataire);

router.get("/cagnotte", controller.getCagnotte);

router.get("/inscription/choix/:type", controller.getInscriptionChoix);

router.put("/public", controller.createPublic);
/**
 * @swagger
 * /public:
 *   put:
 *      description: Used to create a new public user with the given information
 *      tags:
 *          - PUBLIC
 *      parameters:
 *          - in: body
 *            name: user
 *            schema:
 *              type: object
 *              required: true
 *              properties:
 *                  prenom:
 *                      type: string
 *                      example: "Jean"
 *                  nom:
 *                      type: string
 *                      example: "Dupont"
 *                  email:
 *                      type: string
 *                      example: "jean.dupont@gmail.com"
 *                  passwd:
 *                      type: string
 *                      example: "1234"
 *                  id_langue:
 *                      type: integer
 *                      example: 1
 *                  id_age:
 *                      type: integer
 *                      example: 1
 *                  id_sexe:
 *                      type: integer
 *                      example: 2
 *                  id_pays:
 *                      type: integer
 *                      example: 1
 *      responses:
 *          '201':
 *              description: User created successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.delete("/public", controller.deletePublic);
/**
 * @swagger
 * /public:
 *   delete:
 *      description: Used to delete a public account
 *      tags:
 *          - PUBLIC
 *      parameters:
 *          - in: query
 *            name: id_public
 *            type: integer
 *            required: true
 *            example: 5
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.post("/public/:idPublic", controller.updatePublic);
/**
 * @swagger
 * /public/{idPublic}:
 *   post:
 *      description: Used to update a new public user with the given information
 *      tags:
 *          - PUBLIC
 *      parameters:
 *          - in: path
 *            name: idPublic
 *            type: integer
 *            required: true
 *            example: 4
 *          - in: body
 *            name: user
 *            schema:
 *              type: object
 *              required: false
 *              properties:
 *                  prenom:
 *                      type: string
 *                      example: "Jeanne"
 *                  nom:
 *                      type: string
 *                      example: "Dupon"
 *                  email:
 *                      type: string
 *                      example: "jeanne.dupon@gmail.com"
 *                  passwd:
 *                      type: string
 *                      example: "1234"
 *                  id_langue:
 *                      type: integer
 *                      example: 1
 *                  id_age:
 *                      type: integer
 *                      example: 1
 *                  id_sexe:
 *                      type: integer
 *                      example: 1
 *                  id_pays:
 *                      type: integer
 *                      example: 2
 *      responses:
 *          '201':
 *              description: User created successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

// --------- PRESTATAIRE
router.get("/prestataires/prestataire/:nomPrestataire", controller.getPrestataire);

router.get("/prestataire/:idPrestataire", controller.getPrestataireById);
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

router.put("/prestataires", controller.createPrestataire);
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

router.delete("/prestataires", controller.deletePrestataire);
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

router.post("/prestataires/:idPrestataire", controller.updatePrestataire);
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

// -------- ORGA
router.get("/organisateur", controller.getAllOrganisateur);
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

// --------- MAP
router.get("/map/stands", controller.getStands);

router.get("/map/contraintes", controller.getContraintes)
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

router.get("/map/stands/contraintes", controller.getContraintesByStand)
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

router.get("/map/stands/all", controller.getAllStands);
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

router.get("/map/typePresta", controller.getTypeCaracteristiquesPresta);
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

router.get("/map/caracteristiques", controller.getCaracteristiques);
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

router.get("/map/type", controller.getTypes);
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

router.put("/map/presta/stand/:idPresta", controller.updateStandId)

router.get("/resultats/:nomCompetition", controller.getResultats);
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

router.get("/competitions", controller.getCompetition);
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

router.get("/statistiques/prestataire/clics/:id", controller.getClicsPrestataire);

router.put("/statistiques/prestataire/clics/date/:id", controller.putClicsPrestataire);

router.get("/demandes/prestataires", controller.getDemandesPrestataires);

router.post("/demandes/prestataires/:choice", controller.postDemandesPrestataires);

router.get('/demos', controller.getAllDemos);

router.get('/demos/:id/number-places-left', controller.getNbPlacesLeft);

router.post('/demos/:idDemo/reservations', controller.addReservation);

router.delete('/demos/:idDemo', controller.deleteDemo);

router.post('/demos', controller.addDemo);

router.post('/reservation/courses', controller.addReservationCourse);

module.exports = router;
