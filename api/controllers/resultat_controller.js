const chalk = require("chalk");
const services = require("../services/resultat_service");


exports.getResultats = async (req, res) => {
    console.log(chalk.green.inverse('requete pour les resultats'));
    await services.getResultats(req.params.nomCompetition, (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.getParticipants = async (req, res) => {
    console.log(chalk.green.inverse('requete pour récupérer les partipants'));
    await services.getParticipants(req.params.nomCompetition, (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.addClassement = async (req, res) => {
    console.log(chalk.green.inverse('requete pour ajouter un classement'));
    await services.addClassement(req.params.nomCompetition, req.query.idPublic, req.query.position, (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        console.log(results)
        return res.status(200).send({success:1, data: results})
    })
}