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
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:8080',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

/**
 * Import and define all routes
 */
const routes = require("./routes/routes");
const authRoutes = require("./routes/authentification_routes");
app.use("/api/", authRoutes);
app.use("/", routes);

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