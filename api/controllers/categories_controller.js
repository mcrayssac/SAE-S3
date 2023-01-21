const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers][Categories]");
const validator = require("validator");
const services = require("../services/categories_service");


exports.getCategorie = async (req, res) => {
    console.log(chalk.green.inverse('Requete pour les getCategorie reçue.'));
    let type = req.params.nomCategorie;
    await services.getCategorie(type, (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error})
        }
        return res.status(200).send({success: 1, data: results})
    });
}

exports.getCategories = (req, res) => {
    console.log(chalk.green.inverse('Requete pour les categories reçue.'));
    res.send({
        getCategories: services.getCategories(null, (error, results) => {
            if (error) return error
            else return results
        })
    });
}