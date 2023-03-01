/**
 * Import a terminal string styling
 */
const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers][Authentification]");

/**
 * Import services
 */
const services = require("../services/authentification_services");

/**
 * Import JSON Web Token
 */
const jwt = require("jsonwebtoken");

/**
 * Functions
 */
/**
 * Function to access token generate
 * @param user
 * @returns {Promise<*>}
 */
async function generateAccessToken (user) {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Access token generation.`));
    return await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'});
}

/**
 * Function to login
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.login = async (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Login user request received.`));
    console.log(req.body.email, req.body.password);
    await services.getUser(req.body.email, req.body.password, async (error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERROR : No user found`));
            return res.status(401).send({success:0, data: `ERROR : No user found`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Request to login`));
            console.log('getUser : ', results);
            const accessToken = await generateAccessToken(results);
            let data = {
                id: results.id,
                accessToken
            }
            return res.status(200).send(data);
        }
    });
}