const chalk = require("chalk");
const services = require("../services/map_service")

exports.getCourses = async (req, res) =>{
    console.log(chalk.green.inverse('requete pour les courses'));
    await services.getCourses( (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}


exports.getStands = async (req, res) =>{
    console.log(chalk.green.inverse('requete pour les stands'));
    await services.getStands( (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}


exports.getContraintes = async (req, res) => {
    console.log(chalk.green.inverse('requete pour les contraintes'));
    await services.getContraintes( (error, results) => {
        if(error){
            return res.status(400).send({success:0, data:error})
        }
        return res.status(200).send({success:1, data:results})
    })
}


exports.getContraintesByStand = async (req, res) => {
    console.log(chalk.green.inverse('requete pour les contraintes des stands'));
    await services.getContraintesByStand( (error, results) => {
        if(error){
            return res.status(400).send({success:0, data:error})
        }
        return res.status(200).send({success:1, data:results})
    })
}

exports.getAllStands = async (req, res) =>{
    console.log(chalk.green.inverse('requete de tous les stands'));
    await services.getAllStands( (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.getAllPrestataires = async (req, res) =>{
    console.log(chalk.green.inverse('requete pour tous les prestataires'));
    await services.getAllPrestataires( (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.updateStandId = async (req, res) => {
    console.log(chalk.green.inverse('requete pour modifier le stand du prestataire'));
    await services.updateStandId(req.params.idPresta, req.query.idStand,(error, results) => {
        if(error){
            return res.status(400).send({success:0, data:error})
        }
        return res.status(200).send({success:1, data:results})
    })
}

exports.getTypeCaracteristiquesPresta = async (req, res) =>{
    console.log(chalk.green.inverse('requete pour tous les types et caractéristiques des prestataires pour chaque stand'));
    await services.getTypeCaracteristiquesPresta( (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.getCaracteristiques = async (req, res) =>{
    console.log(chalk.green.inverse('requete pour tous les types et caractéristiques'));
    await services.getCaracteristiques( (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.getTypes = async (req, res) =>{
    console.log(chalk.green.inverse('requete pour tous les types et caractéristiques'));
    await services.getTypes( (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}
