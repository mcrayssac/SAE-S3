const services = require("../services/competition_service");
const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers][Competition]");

exports.getCompetition = async (req, res) => {
    console.log(chalk.green.inverse('requete pour les competitions'));
    await services.getCompetition((err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}