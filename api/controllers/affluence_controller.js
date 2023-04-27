const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers][Affluence]");
const validator = require("validator");
const services = require("../services/affluence_service");


exports.getAffluence = async (req, res) => {
    console.log(chalk.green.inverse('Requete getAffluence reçue.'));
    await services.getAffluence(req.params.id, (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error})
        }
        return res.status(200).send({success: 1, data: results})
    });
}

exports.setAffluence = async (req, res) => {
    console.log(chalk.green.inverse('Requete setAffluence reçue.'));
    await services.setAffluence(req.params.id, req.query.idAffluence, (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error})
        }
        return res.status(200).send({success: 1, data: results})
    });
}