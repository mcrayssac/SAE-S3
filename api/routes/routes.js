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


router.get("/prestataires/:nomPrestataire", controller.getPrestataire);

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

router.get("/inscription/choix", controller.getInscriptionChoix);


// --------- PRESTATAIRE
// --------- MAP
router.get("/map/stands", controller.getStands);

module.exports = router;
