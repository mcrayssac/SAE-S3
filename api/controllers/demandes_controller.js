const chalk = require("chalk");
const services = require("../services/demandes_service");


exports.getDemandesPrestataires = async (req, res) => {
    console.log(chalk.green.inverse('requete pour les demandes de prestataires'));
    await services.getDemandesPrestataires( (error, results) => {
        if(error){
            return res.status(400).send({success:0, data:error})
        }
        return res.status(200).send({success:1, data:results})
    })
}

exports.postDemandesPrestataires = async (req, res) => {
    console.log(chalk.green.inverse('requete pour accept/decline un prestataire'));
    await services.postDemandesPrestataires(req.params.choice,  req.body.id, (error, results) => {
        if(error){
            return res.status(400).send({success:0, data:error})
        }
        return res.status(200).send({success:1, data:results})
    })
}

exports.getDemandesActivites = async (req, res) => {
    console.log(chalk.green.inverse("requete pour les demandes d'activites"));
    await services.getDemandesActivites( (error, results) => {
        if(error){
            return res.status(400).send({success:0, data:error})
        }
        return res.status(200).send({success:1, data:results})
    })
}

exports.postDemandesActivites = async (req, res) => {
    console.log(chalk.green.inverse('requete pour accept/decline une activité'));
    console.log("pgreg")
    console.log(req.params.choice)
    console.log(req.body.id, req.body.id_init)
    await services.postDemandesActivites(req.params.choice,  req.body.id, req.body.id_init, (error, results) => {
        if(error){
            return res.status(400).send({success:0, data:error})
        }
        return res.status(200).send({success:1, data:results})
    })
}