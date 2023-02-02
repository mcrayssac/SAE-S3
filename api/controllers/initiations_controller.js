const chalk = require("chalk");
const services = require("../services/initiations_services");
const demosServices = require("../services/demos_service")

exports.getAllInitiations = async (req,res ) => {
    console.log(chalk.green.inverse('Requête pour toutes les initiations'));
    await services.getAllInitiations( req.query.idPresta, (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.getNbPlacesLeft = async (req, res) => {
    console.log(chalk.green.inverse('Requête pour les places disponibles pour une initiations'));
    await demosServices.getNbPlacesLeft( req.params.id,(err, results) => {
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
    await demosServices.addReservation( req.params.idInit, nbPlacesReserv, dateReserv, idPublic, (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.deleteInitiation = async (req, res) => {
    console.log(chalk.green.inverse('Requête pour supprimer une initiations'));
    let date = req.query.date
    await demosServices.deleteDemo( req.params.idInit, date, (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.addInitiation = async(req, res) => {
    console.log(chalk.green.inverse('Requête pour ajouter une initiation'));
    await services.addInitiation( req.query.dateDebut, req.query.dateFin, req.query.nbPlaces, req.query.idPresta, req.query.title, (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}