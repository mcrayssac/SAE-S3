const services = require("../services/services");
const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers]");

exports.getCategorie = (req, res) => {
    console.log(chalk.green.inverse('Requete pour les getCategorie reçue.'));
    let type = req.params.nomCategorie;
    res.send({
        title: services.getCategories(type, (error, results) => {
            if (error) return error
            else return results
        }),
        getFiltres: services.getFiltres(type, (error, results) => {
            if (error) return error
            else return results
        }),
        getCards: services.getPrestataire(type, (error, results) => {
            if (error) return error
            else return results
        })
    });
}

// Swagger
exports.getCategories = (req, res) => {
    console.log(chalk.green.inverse('Requete pour les categories reçue.'));
    res.send({
        getCategories: services.getCategories(null, (error, results) => {
            if (error) return error
            else return results
        })
    });
}

exports.getPrestataire = (req, res) => {
    console.log(chalk.green.inverse('Requete pour les getCategorie reçue.'));
    let type = req.params.nomPrestataire;
    res.send({
        getClub: services.getClub(type, (error, results) => {
            if (error) return error
            else return results
        })
    });
}

// Swagger
exports.getCagnotte = (req, res) => {
    console.log(chalk.green.inverse('Requete pour getCagnotte reçue.'));
    res.send({
        getCagnotte: services.getCagnotte((error, results) => {
            if (error) return error
            else return results
        })
    });
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

exports.getInscriptionChoix = async (req, res) => {
    console.log(chalk.green.inverse("requete pour les choix d'inscription"));
    await services.getInscriptionChoix( async (error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERROR : No chooses found`));
            return res.status(401).send({success:0, data: `ERROR : No chooses found`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Request to inscription chooses`));
            return res.status(200).send({success:1, data: results});
        }
    });
}

exports.getInscriptionChoixPrestataire = async (req, res) => {
    console.log(chalk.green.inverse("requete pour les choix d'inscription du prestataire"));
    await services.getInscriptionChoixPrestataire( async (error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERROR : No chooses found`));
            return res.status(401).send({success:0, data: `ERROR : No chooses found`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Request to prestataire inscription chooses`));
            return res.status(200).send({success:1, data: results});
        }
    });
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

exports.getTypeCaracteristiquesPresta = async (req, res) =>{
    console.log(chalk.green.inverse('requete pour tous les types et caractéristiques des prestataires'));
    await services.getTypeCaracteristiquesPresta( (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.getResultats = async (req, res) => {
    console.log(chalk.green.inverse('requete pour les resultats'));
    console.log(req.params.nomCompetition);
    await services.getResultats(req.params.nomCompetition, (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

//Swagger
exports.getOrganisateur = async (req, res) => {/*
    services.getOrganisateur( async (error, results) => {
        console.log(chalk.green.inverse("requete pour les organisateurs"));
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERROR : No chooses found`));
            return res.status(401).send({success:0, data: `ERROR : No chooses found`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Request to getOrganisation`));
            return res.status(200).send({success:1, data: results});
        }
    });*/
}