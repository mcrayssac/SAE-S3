const services = require("../services/stats_service");
const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers][Stats]");


exports.getClicsPrestataire = async (req, res) => {
    await services.getClicsPrestataire(req.params.id, async (error, results) => {
        console.log(chalk.green.inverse("requete pour get les clics d'un prestataire"));
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERREUR : Pas de clics trouvé`));
            return res.status(401).send({success:0, data: `ERREUR : Pas de clics trouvé`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Requête pour get les clics d'un prestataire`));
            return res.status(200).send({success:1, data: results});
        }
    });
}

exports.putClicsPrestataire = async (req, res) => {
    await services.putClicsPrestataire(req.params.id, async (error, results) => {
        console.log(chalk.green.inverse("Requête pour put un clic d'un prestataire"));
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERREUR : Probleme lors d'ajout d'un clic`));
            return res.status(401).send({success:0, data: `ERREUR : Probleme lors d'ajout d'un clic`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Requête pour put un clic d'un prestataire`));
            return res.status(200).send({success:1, data: results});
        }
    });
}
