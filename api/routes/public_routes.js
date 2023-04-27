const express = require("express");
const controller = require("../controllers/public_controller");

//Import module de session et cookies
const expressSession = require("express-session");
cookieParser = require("cookie-parser");

//Define express router
let router = express.Router();
const cacheMiddlewares = require("../cache/cache_middleware");
const {cache} = require("express/lib/application");



// --------- PUBLIC
router.get("/", cacheMiddlewares(200), controller.getAllPublic);
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

router.get("/:idPublic", cacheMiddlewares(200), controller.getPublicById);
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

router.put("/", cacheMiddlewares(200), controller.createPublic);
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

router.delete("/", cacheMiddlewares(200), controller.deletePublic);
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

router.post("/:idPublic", cacheMiddlewares(200), controller.updatePublic);
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



module.exports = router;