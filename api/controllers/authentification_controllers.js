const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers][Authentification]");

const services = require("../services/authentification_services");

//Define users
const axios = require("axios");

exports.login = (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Login user request received.`));
    const email = req.body.email
    const password = req.body.password
    axios.post('http://localhost:3003/login', {
        email,
        password
    }).then(function (response) {
        console.log(response.data);
        return res.status(200).send({success:1, data: response.data});
    }).catch(function (error) {
        console.log(error.data);
        return res.status(401).send({success:0, data: `ERROR : Login error !`});
    })
}

exports.user = (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} User request received.`));
    const token = req.headers['authorization'];
    const instanceAuth = axios.create({
        baseURL: 'http://localhost:3003/'
    });
    instanceAuth.defaults.headers.common['authorization'] = token;
    instanceAuth.post('/user')
        .then(function (response) {
            console.log(response.data);
            return res.status(200).send({success:1, data: response.data});
        }).catch(function (error) {
        console.log(error.data);
        return res.status(401).send({success:0, data: `ERROR : Token error !`});
    })
}

exports.create = async (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Create user request received.`));
    const form = req.body.form
    const admin = req.body.admin
    axios.post('http://localhost:3003/user/create', {
        form,
        admin
    }).then(function (response) {
        console.log(response.data);
        return res.status(200).send({success:1, data: response.data});
    }).catch(function (error) {
        console.log(error.data);
        return res.status(401).send({success:0, data: `ERROR : Create user error !`});
    })
}

exports.userDelete = async (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Delete user request received.`));
    const id = req.params.id
    axios.delete(`http://localhost:3003/user/delete/${id}`).then(function (response) {
        console.log(response.data);
        return res.status(200).send({success:1, data: response.data});
    }).catch(function (error) {
        console.log(error.data);
        return res.status(401).send({success:0, data: `ERROR : Delete user error !`});
    })
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