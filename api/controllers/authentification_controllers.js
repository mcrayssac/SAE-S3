const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers][Authentification]");

const services = require("../services/authentification_services");

//Define users
const jwt = require("jsonwebtoken");
const axios = require("axios");

//Function to user authenticate
exports.authenticateToken = async function (req, res, next){
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} User authentification belongs to a token.`));
    const authHeader = req.headers['authorization'];
    //console.log(authHeader);
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
    const email = req.body.email
    const password = req.body.password
    axios.post('http://localhost:3003/login', {
        email,
        password
    }).then(function (response) {
        console.log(response);
        return res.status(200).send({success:1, data: response.data});
    }).catch(function (error) {
        console.log(error);
        return res.status(401).send({success:0, data: `ERROR : Login error !`});
    })
}

exports.user = async (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} User request received.`));
    console.log("User : ", req.user);
    await res.send(req.user);
}

exports.checkEmailPublic = async (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Public email check request received.`));
    console.log(req.body.email);
    await services.checkEmailPublic(req.body.email, async (error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERROR : Email existing`));
            return res.status(401).send({success:0, data: `ERROR : Email existing`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Request to public email check successful`));
            return res.status(200).send({success:1, data: results});
        }
    });
}

exports.checkEmailPrestataire = async (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Prestataire email check request received.`));
    console.log(req.body.email);
    await services.checkEmailPrestataire(req.body.email, async (error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERROR : Email existing`));
            return res.status(401).send({success:0, data: `ERROR : Email existing`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Request to prestataire email check successful`));
            return res.status(200).send({success:1, data: results});
        }
    });
}

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