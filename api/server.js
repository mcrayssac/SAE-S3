/**
 * Usage :
 *
 */

/**
 * Import and define Node.js web framework
 */
const express = require("express");
const app = express();

/**
 * Import a terminal string styling
 */
const chalk = require("chalk");
const chalkServer = chalk.inverse.blue.bold.bgWhite("[Server]");



const keys = require('./config/keys')

const cors = require('cors');
const corsOptions = {
    origin: [
        process.env.LOCALHOST_PORT,
        keys.google.clientID,
    ],
    credentials: true, // access-control-allow-credentials:true
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(cors({ origin: 'http://localhost:8080' }));


/**
 * Import and define swagger doc
 */
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express")

/** Swagger Initialization - START */
const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "REST API SAE-S3",
            description: "API documentation",
            servers: ["http://localhost:3000/"],
        },
    }),
    apis: ["server.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));


/**
 * Import and define Node.js body parsing middleware
 */
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Environment and Port configuration
 */
const dotEnv = require("dotenv");
dotEnv.config();
const port = process.env.PORT;

/**
 * If port not found then an error sent
 */
if (port === undefined || port === null){
    console.log(port);
    throw new Error(`Port not found ! : ${port}.`);
}


/**
 * Google authentification
 */

const passportSetup = require('./config/passport-setup')
const passport = require('passport')
const session = require('express-session')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: [keys.session.cookieKey],
    resave: true,
    saveUninitialized: true,
    maxAge: 1000*60*60*60, // session max age in milliseconds
    cookie: { secure: false }
}));


// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
});


/**
 * Import and define all routes
 */
const routes = require("./routes/prestataires_routes");
const resultatsRoutes = require("./routes/resultat_routes");
const authRoutes = require("./routes/authentification_routes");
const categorieRoutes = require("./routes/categories_routes");
const demosRoutes = require("./routes/demos_routes");
const initiationsRoutes = require("./routes/initiations_routes");
const competitionRoutes = require("./routes/competition_routes");
const publicRoutes = require("./routes/public_routes");
const mapRoutes = require("./routes/map_routes");
const statistiquesRoutes = require("./routes/statistiques_routes");
const demandesRoutes = require("./routes/demandes_routes");
const organisateurRoutes = require("./routes/organisateur_routes");
const reservationRoutes = require("./routes/reservation_routes");
const inscriptionRoutes = require("./routes/inscription_routes");
const cagnotteRoutes = require("./routes/cagnotte_routes");
const affluenceRoutes = require("./routes/affluence_routes")

app.use("/api/", authRoutes);
app.use("/", routes);
app.use("/resultats", resultatsRoutes);
app.use("/categories", categorieRoutes);
app.use("/demos", demosRoutes);
app.use("/initiations", initiationsRoutes);
app.use("/competitions", competitionRoutes);
app.use("/public", publicRoutes);
app.use("/map", mapRoutes);
app.use("/statistiques", statistiquesRoutes);
app.use("/demandes", demandesRoutes);
app.use("/organisateur", organisateurRoutes);
app.use("/reservation", reservationRoutes);
app.use("/inscription", inscriptionRoutes);
app.use("/cagnotte", cagnotteRoutes);
app.use("/affluence", affluenceRoutes)


/**
 * Show user ip, browser and language
 */
app.use((req, res, next) => {
    /*console.log("IP : " + JSON.stringify(req.ip));
    console.log("Browser : " + req.headers["user-agent"]);
    console.log("Language : " + req.headers["accept-language"]);*/
    //Permet de pas bloquer le site en utilisant next
    next();
});

/**
 * If path not found before then an error sent
 */
app.use("*", (req, res, next) => {
    const err = new Error("Not found !");
    err.status = 404;
    next(err);
});


/**
 * Port display
 */
app.listen(port, () => {
    console.log(chalk.inverse.black.bold.bgGreen(`${chalkServer} Welcome, api listen on ${port} port.`));
});

