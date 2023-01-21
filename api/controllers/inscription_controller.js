const chalk = require("chalk");
const services = require("../services/inscription_service");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers][Inscription]");

exports.getInscriptionChoix = async (req, res) => {
    console.log(chalk.green.inverse("requete pour les choix d'inscription"));
    if (req.params.type === "public"){
        await services.getInscriptionChoix( async (error, results) => {
            if(error){
                console.log(chalk.red.inverse(`${chalkController} ERROR : No chooses found`));
                return res.status(401).send({success:0, data: `ERROR : No chooses found`});
            } else {
                console.log(chalk.green.inverse(`${chalkController} Request to inscription chooses`));
                return res.status(200).send({success:1, data: results});
            }
        });
    } else if (req.params.type === "prestataire"){
        await services.getInscriptionChoixPrestataire( async (error, results) => {
            if(error){
                console.log(chalk.red.inverse(`${chalkController} ERROR : No chooses found`));
                return res.status(401).send({success:0, data: `ERROR : No chooses found`});
            } else {
                console.log(chalk.green.inverse(`${chalkController} Request to prestataire inscription chooses`));
                return res.status(200).send({success:1, data: results});
            }
        });
    } else return res.status(401).send({success:0, data: `ERROR : Not found`});

}