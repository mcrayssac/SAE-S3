const express = require("express");
const controller = require("../controllers/controllers");

//Import module de session et cookies
const expressSession = require("express-session");
    cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();


// --------- PUBLIC
router.get("/categories/:nomCategorie", controller.getCategorie);

router.get("/categories", controller.getCategories);
/**
 * @swagger
 * /categories:
 *   get:
 *      description: Get categories of prestataires
 *      tags:
 *          - CATEGORIES
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.post("/prestataires/:nomPrestataire/post_commentaire", controller.addCommentaire);

// router.get("/courses/classement/:idCourse", controller.getClassementCourse)

// --------- ORGANISATEUR

router.get("/prestataires/:nomPrestataire", controller.getPrestataire);
/**
 * @swagger
 * /prestataires/{nomPrestataire}:
 *   get:
 *      description: Get a prestataire by its name
 *      tags:
 *          - PRESTATAIRES
 *      parameters:
 *          - in: path
 *            name: nomPrestataire
 *            type: string
 *            required: true
 *            example: "jdadijonbasket"
 *            description: Name of prestataires
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */


router.get("/cagnotte", controller.getCagnotte);
/**
 * @swagger
 * /cagnotte:
 *   get:
 *      description: Get cagnotte
 *      tags:
 *          - CAGNOTTE
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/inscription/choix/:type", controller.getInscriptionChoix);


// --------- PRESTATAIRE

// -------- ORGA
router.get("/organisateur", controller.getOrganisateur);

// --------- MAP
router.get("/map/stands", controller.getStands);

router.get("/map/contraintes", controller.getContraintes)

router.get("/map/stands/contraintes", controller.getContraintesByStand)

router.get("/map/stands/all", controller.getAllStands);

router.get("/prestataires", controller.getAllPrestataires);

router.get("/map/typePresta", controller.getTypeCaracteristiquesPresta);

router.get("/map/caracteristiques", controller.getCaracteristiques);

router.get("/map/type", controller.getTypes);

router.put("/map/presta/stand/:idPresta", controller.updateStandId)

router.get("/resultats/:nomCompetition", controller.getResultats);

router.get("/competitions", controller.getCompetition);

router.get("/statistiques/prestataire/clics/:id", controller.getClicsPrestataire);

module.exports = router;
