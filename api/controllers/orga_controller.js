const services = require("../services/orga_service");
const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers][Orga]");

//Swagger
exports.getAllOrganisateur = async (req, res) => {
    await services.getAllOrganisateur( async (error, results) => {
        console.log(chalk.green.inverse("requete pour les organisateurs"));
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERROR : No chooses found`));
            return res.status(401).send({success:0, data: `ERROR : No chooses found`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Request to getOrganisation`));
            return res.status(200).send({success:1, data: results});
        }
    });
}