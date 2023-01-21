const services = require("../services/reservation_service");
const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers][Réservation]");

exports.addReservationCourse = async (req, res) => {
    await services.addReservationCourse(req.body.data, async (error, results) => {
        console.log(chalk.green.inverse("Requête pour ajouter une réservation d'une course"));
        if(error === false){
            console.log(chalk.red.inverse(`${chalkController} ERREUR : Probleme lors de l'ajout de la réservation d'une course`));
            return res.status(401).send({success:0, data: `Vous êtes déjà inscrit pour cette course !`});
        } else if(error){
            console.log(chalk.red.inverse(`${chalkController} ERREUR : Probleme lors de l'ajout de la réservation d'une course`));
            return res.status(401).send({success:0, data: `ERREUR : Probleme lors de l'ajout de la réservation d'une course`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Requête pour ajouter une réservation d'une course`));
            return res.status(200).send({success:1, data: results});
        }
    });
}