const chalk = require("chalk");
const services = require("../services/demos_service");

exports.getAllDemos = async (req,res ) => {
    console.log(chalk.green.inverse('Requête pour toutes les démos'));
    await services.getAllDemos( (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.getNbPlacesLeft = async (req, res) => {
    console.log(chalk.green.inverse('Requête pour les places disponibles pour une démo'));
    await services.getNbPlacesLeft( req.params.id,(err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.addReservation = async (req, res) => {
    console.log(chalk.green.inverse('Requête pour ajouter une réservation'));
    let nbPlacesReserv = req.query.nbPlaces
    let dateReserv = req.query.date
    let idPublic = req.query.idPublic
    await services.addReservation( req.params.idDemo, nbPlacesReserv, dateReserv, idPublic, (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.deleteDemo = async (req, res) => {
    console.log(chalk.green.inverse('Requête pour supprimer une démonstration de la scène'));
    let date = req.query.date
    await services.deleteDemo( req.params.idDemo, date, (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.addDemo = async(req, res) => {
    console.log(chalk.green.inverse('Requête pour ajouter une démonstration de la scène'));
    await services.addDemo( req.query.dateDebut, req.query.dateFin, req.query.nbPlaces, req.query.idPresta, req.query.title, (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}