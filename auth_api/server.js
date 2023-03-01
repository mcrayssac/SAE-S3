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
    throw new Error(`${chalkServer} Port not found ! : ${port}.`);
}

/**
 * Import cors to accept http request from main server
 */
const cors = require('cors');
const corsOptions ={
    origin:process.env.LOCALHOST_PORT,
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

//TODO: ...

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
    console.log(chalk.inverse.black.bold.bgGreen(`${chalkServer} Welcome, authentification api listen on ${port} port.`));
});