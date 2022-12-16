const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers][Authentification]");

const services = require("../services/authentification_services");

//Define users
const jwt = require("jsonwebtoken");
const pool = require("../database/db");
const queries = require("../queries/authentification_queries");
const user = {id: 42, name: "max", email:"max@gmail.com", password: 'max', admin: true}

//Function to access token generate
async function generateAccessToken (user) {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Access token generation.`));
    return await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'});
}

//Function to user authenticate
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

exports.login = async (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Login user request received.`));
    console.log(req.body.email, req.body.password);
    await services.getUser(req.body.email, req.body.password, async (error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERROR : No user found`));
            return res.status(401).send({success:0, data: `ERROR : No user found`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Request to login`));
            const accessToken = await generateAccessToken(results);
            let data = {
                id: results.id,
                accessToken
            }
            return res.status(200).send({success:1, data});
        }
    });
}

exports.user = async (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} User request received.`));
    console.log(req.user);
    await res.send(req.user);
}

exports.create = async (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Create user request received.`));
    if (req.body.email && req.body.password) {
        await res.send(user);
        return;
    }
    await res.status(401).send('invalid credentials');
}