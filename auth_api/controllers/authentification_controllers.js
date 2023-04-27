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
exports.generateAccessToken= async (user) =>{
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
            const accessToken = await this.generateAccessToken(results)
            let data = {
                id: results.id,
                accessToken
            }
            return res.status(200).send(data);
        }
    });
}

/**
 * Function to verify user authentification token
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.authenticateToken = async function (req, res, next){
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} User authentification belongs to a token.`));
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    if (!token){
        return res.sendStatus(401);
    }
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    })
}

/**
 * Function to get user infos
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.user = async (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} User request received.`));
    console.log("User : ", req.user);
    await res.send(req.user);
}

/**
 * Function to account creation
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.create = async (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Create user request received.`));
    console.log("Form : ",req.body.form, " Admin : ", req.body.admin);
    await services.create(req.body.form, req.body.admin, async (error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERROR : Create user error`));
            return res.status(401).send({success:0, data: `ERROR : Create user error`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Request to create user successful`));
            return res.status(200).send({success:1, data: results});
        }
    });
}

exports.userDelete = async (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Delete user request received.`));
    console.log(req.params.id);
    await services.userDelete(req.params.id, async (error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERROR : Delete user error`));
            return res.status(401).send({success:0, data: `ERROR : Delete user error`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Request to delete user successful`));
            return res.status(200).send({success:1, data: results});
        }
    });
}
