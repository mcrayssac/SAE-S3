const services = require("../services/services");
const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers]");
const validator = require("validator");

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
            console.log(results)
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
    console.log(chalk.green.inverse('Requete pour les demandes de prestataires'));
    await services.getDemandesPrestataires( (error, results) => {
        if(error){
            return res.status(400).send({success:0, data:error})
        }
        return res.status(200).send({success:1, data:results})
    })
}

exports.postDemandesPrestataires = async (req, res) => {
    console.log(chalk.green.inverse('Requete pour accept/decline un prestataire'));
    await services.postDemandesPrestataires(req.params.choice,  req.body.id, (error, results) => {
        if(error){
            return res.status(400).send({success:0, data:error})
        }
        return res.status(200).send({success:1, data:results})
    })
}

exports.updateStandId = async (req, res) => {
    console.log(chalk.green.inverse('Requete pour modifier le stand du prestataire'));
    await services.updateStandId(req.params.idPresta, req.query.idStand,(error, results) => {
        if(error){
            return res.status(400).send({success:0, data:error})
        }
        return res.status(200).send({success:1, data:results})
    })
}

exports.getTypeCaracteristiquesPresta = async (req, res) =>{
    console.log(chalk.green.inverse('Requete pour tous les types et caractéristiques des prestataires pour chaque stand'));
    await services.getTypeCaracteristiquesPresta( (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.getCaracteristiques = async (req, res) =>{
    console.log(chalk.green.inverse('Requete pour tous les types et caractéristiques'));
    await services.getCaracteristiques( (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.getTypes = async (req, res) =>{
    console.log(chalk.green.inverse('Requete pour tous les types et caractéristiques'));
    await services.getTypes( (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.getResultats = async (req, res) => {
    console.log(chalk.green.inverse('Requete pour les resultats.'));
    console.log(req.params.nomCompetition);
    await services.getResultats(req.params.nomCompetition, (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.getCompetition = async (req, res) => {
    console.log(chalk.green.inverse('Requete pour les competitions.'));
    await services.getCompetition((err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

//Swagger
exports.getAllOrganisateur = async (req, res) => {
    services.getAllOrganisateur( async (error, results) => {
        console.log(chalk.green.inverse("Requete pour les organisateurs"));
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERROR : No chooses found`));
            return res.status(401).send({success:0, data: `ERROR : No chooses found`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Request to getOrganisation`));
            return res.status(200).send({success:1, data: results});
        }
    });
}

// Swagger
exports.getAllPublic = async (req, res) => {
    services.getAllPublic( async (error, results) => {
        console.log(chalk.green.inverse("Requete pour tous les publics reçue."));
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERROR : No chooses found`));
            return res.status(401).send({success:0, data: `ERROR : No chooses found`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Request to getOrganisation`));
            return res.status(200).send({success:1, data: results});
        }
    });
}

// Swager
exports.getPublicById = (req, res) => {
    const idPublic = parseInt(req.params.idPublic);

    services.getPublicById([idPublic], (error, results) => {
        console.log(chalk.green("Requete pour le public ID =" + idPublic + " reçue."));
        if (error) {
            console.log(error);
            res.status(400).send({success: 0, data: error});
        }
        res.status(200).json(results);
    });
}

// Swager
exports.getPrestataireById = (req, res) => {
    const idPrestataire =req.params.idPrestataire;
    services.getPrestataireById([idPrestataire], (error, results) => {
        console.log(chalk.green("Requete pour le prestataire ID=" + idPrestataire + " reçue."));
        if (error) {
            console.log(error);
            res.status(400).send({success: 0, data: error});
        }
        res.status(200).json(results);
    });
}

// Swagger
exports.createPublic = (req, res) => {
    console.log(chalk.green("Requete pour créer un public recue!"));
    let prenom = req.body.prenom;
    let nom = req.body.nom;
    let email = req.body.email
    let passwd = req.body.passwd;
    let id_langue = req.body.id_langue;
    let id_age = req.body.id_age;
    let id_sexe = req.body.id_sexe;
    let id_pays = req.body.id_pays;

    console.log("Prenom = " + prenom + ", Nom = " + nom + ", Email = " + email + ", Passwd = " + passwd + ", Langue = " + id_langue + ", Age = " + id_age + ", Sexe = " + id_sexe + ", Pays = " + id_pays);

    prenom = typeof prenom === 'undefined' ? "" : prenom;
    nom = typeof nom === 'undefined' ? "" : nom;
    email = typeof email === 'undefined' ? "" : email;
    passwd = typeof passwd === 'undefined' ? "" : passwd;
    id_langue = typeof id_langue === 'undefined' ? "" : id_langue;
    id_age = typeof id_age === 'undefined' ? "" : id_age;
    id_sexe = typeof id_sexe === 'undefined' ? "" : id_sexe;
    id_pays = typeof id_pays === 'undefined' ? "" : id_pays;

    if (validator.isEmpty(prenom) || prenom === '{prenom}' || prenom === 'undefined' ||
        validator.isEmpty(nom) || nom === '{nom}' || nom === 'undefined' ||
        validator.isEmpty(email) || email === '{email}' || email === 'undefined' ||
        validator.isEmpty(passwd) || passwd === '{passwd}' || passwd === 'undefined' ||
        id_langue === '{id_langue}' || id_langue === 'undefined' ||
        id_age === '{id_age}' || id_age === 'undefined' ||
        id_sexe === '{id_sexe}' || id_sexe === 'undefined' ||
        id_pays === '{id_pays}' || id_pays === 'undefined') {
        return res.status(400).send({success:0,data: "Bad request, veuillez remplir tous les champs."});

    } else if (validator.isAscii(prenom) && validator.isAscii(nom) && validator.isEmail(email)
        && validator.isAscii(passwd)) {
        services.createPublic(prenom, nom, email, passwd, id_langue, id_age, id_sexe, id_pays,  (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({success: 0, data: error});
            }
            return res.status(200).json(results);
        })
    } else {
        return res.status(400).send({success: 0, data: "Bad request"});
    }
}

// Swagger
exports.createPrestataire = (req, res) => {
    console.log(chalk.green("Requete pour créer un prestataire recue!"));
    let nom = req.body.nom;
    let email = req.body.email
    let telephone = req.body.telephone;
    let site_web = req.body.site_web;
    let passwd = req.body.passwd;
    let id_type = req.body.id_type;


    console.log("Nom = " + nom + ", Email = " + email + ", Telephone = " + telephone + ", Site web = " + site_web + ", Passwd = " + passwd +", Type = " + id_type);

    nom = typeof nom === 'undefined' ? "" : nom;
    email = typeof email === 'undefined' ? "" : email;
    telephone = typeof telephone === 'undefined' ? "" : telephone;
    site_web = typeof site_web === 'undefined' ? "" : site_web;
    passwd = typeof passwd === 'undefined' ? "" : passwd;
    id_type = typeof id_type === 'undefined' ? "" : id_type;

    if (validator.isEmpty(nom) || nom === '{nom}' || nom === 'undefined' ||
        validator.isEmpty(email) || email === '{email}' || email === 'undefined' ||
        validator.isEmpty(telephone) || telephone === '{telephone}' || telephone === 'undefined' ||
        validator.isEmpty(site_web) || site_web === '{site_web}' || site_web === 'undefined' ||
        validator.isEmpty(passwd) || passwd === '{passwd}' || passwd === 'undefined' ||
        id_type === '{id_type}' || id_type === 'undefined') {
        return res.status(400).send({success:0,data: "Bad request, veuillez remplir tous les champs."});

    } else if (validator.isAscii(nom) && validator.isEmail(email) && validator.isAscii(telephone)
        && validator.isAscii(site_web) && validator.isAscii(passwd)) {
        services.createPrestataire(nom, email, telephone, site_web, passwd,id_type, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({success: 0, data: error});
            }
            return res.status(200).json(results);
        })
    } else {
        return res.status(400).send({success: 0, data: "Bad request!"});
    }
}

// Swagger
exports.deletePublic = (req, res) => {
    console.log(chalk.green("Requete pour supprimer un public recue!"));
    let id_public = req.query.id_public

    id_public = typeof id_public === 'undefined' ? "" : id_public;

    if (validator.isEmpty(id_public) || id_public === '{id_public}' || id_public === 'undefined') {
        return res.status(400).send({success:0,data: "Bad request, veuillez fournir un ID."});
    } else if ((validator.isInt(id_public))) {
        services.deletePublic([id_public], (error, results) => {
            console.log(chalk.green("Requete pour supprimer un public recue"));
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            res.status(200).json(results);
        });
    } else {
        return res.status(400).send({success: 0, data: "Bad request"});
    }
}

// Swagger
exports.deletePrestataire = (req, res) => {
    console.log(chalk.green("Requete pour supprimer un prestataire recue!"));
    let id_prestataire = req.query.id_prestataire

    id_prestataire = typeof id_prestataire === 'undefined' ? "" : id_prestataire;

    if (validator.isEmpty(id_prestataire) || id_prestataire === '{id_prestataire}' || id_prestataire === 'undefined') {
        return res.status(400).send({success:0,data: "Bad request, veuillez fournir un ID."});
    } else if ((validator.isInt(id_prestataire))) {
        services.deletePrestataire([id_prestataire], (error, results) => {
            console.log(chalk.green("Requete pour supprimer un prestataire recue"));
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            res.status(200).json(results);
        });
    } else {
        return res.status(400).send({success: 0, data: "Bad request"});
    }
}

// Swagger
exports.updatePublic = (req, res) => {
    console.log(chalk.green("Requete pour modifier un public reçue!"));
    let idPublic = req.params.idPublic;
    let prenom = req.body.prenom;
    let nom = req.body.nom;
    let email = req.body.email
    let passwd = req.body.passwd;
    let id_langue = req.body.id_langue;
    let id_age = req.body.id_age;
    let id_sexe = req.body.id_sexe;
    let id_pays = req.body.id_pays;

    console.log("id= "+ idPublic+" Prenom = " + prenom + ", Nom = " + nom + ", Email = " + email + ", Passwd = " + passwd + ", Langue = " + id_langue + ", Age = " + id_age + ", Sexe = " + id_sexe + ", Pays = " + id_pays);

    idPublic = typeof idPublic === 'undefined' ? "" : idPublic;
    prenom = typeof prenom === 'undefined' ? "" : prenom;
    nom = typeof nom === 'undefined' ? "" : nom;
    email = typeof email === 'undefined' ? "" : email;
    passwd = typeof passwd === 'undefined' ? "" : passwd;
    id_langue = typeof id_langue === 'undefined' ? "" : id_langue;
    id_age = typeof id_age === 'undefined' ? "" : id_age;
    id_sexe = typeof id_sexe === 'undefined' ? "" : id_sexe;
    id_pays = typeof id_pays === 'undefined' ? "" : id_pays;

    if (validator.isEmpty(idPublic) || idPublic === '{idPublic}' || idPublic === 'undefined' ||
        validator.isEmpty(prenom) || prenom === '{prenom}' || prenom === 'undefined' ||
        validator.isEmpty(nom) || nom === '{nom}' || nom === 'undefined' ||
        validator.isEmpty(email) || email === '{email}' || email === 'undefined' ||
        validator.isEmpty(passwd) || passwd === '{passwd}' || passwd === 'undefined' ||
        id_langue === '{id_langue}' || id_langue === 'undefined' ||
        id_age === '{id_age}' || id_age === 'undefined' ||
        id_sexe === '{id_sexe}' || id_sexe === 'undefined' ||
        id_pays === '{id_pays}' || id_pays === 'undefined') {
        console.log("pass pas good")
        return res.status(400).send({success:0,data: "Bad request, veuillez remplir les champs."});

    } else if (validator.isInt(idPublic) && validator.isAscii(prenom) && validator.isAscii(nom) && validator.isEmail(email)
        && validator.isAscii(passwd)) {
        services.updatePublic(idPublic, prenom, nom, email, passwd, id_langue, id_age, id_sexe, id_pays,  (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({success: 0, data: error});
            }
            return res.status(200).json(results);
        })
    } else {
        return res.status(400).send({success: 0, data: "Bad request!"});
    }
}

// Swagger
exports.updatePrestataire = (req, res) => {
    console.log(chalk.green("Requete pour modifier un prestataire recue!"));
    let idPrestataire = req.params.idPrestataire;
    let nom = req.body.nom;
    let email = req.body.email
    let telephone = req.body.telephone;
    let site_web = req.body.site_web;
    let passwd = req.body.passwd;
    let id_type = req.body.id_type;


    console.log("Nom = " + nom + ", Email = " + email + ", Telephone = " + telephone + ", Site web = " + site_web + ", Passwd = " + passwd +", Type = " + id_type);

    idPrestataire = typeof idPrestataire === 'undefined' ? "" : idPrestataire;
    nom = typeof nom === 'undefined' ? "" : nom;
    email = typeof email === 'undefined' ? "" : email;
    telephone = typeof telephone === 'undefined' ? "" : telephone;
    site_web = typeof site_web === 'undefined' ? "" : site_web;
    passwd = typeof passwd === 'undefined' ? "" : passwd;
    id_type = typeof id_type === 'undefined' ? "" : id_type;

    if (validator.isEmpty(idPrestataire) || idPrestataire === '{idPrestataire}' || idPrestataire === 'undefined' ||
        validator.isEmpty(nom) || nom === '{nom}' || nom === 'undefined' ||
        validator.isEmpty(email) || email === '{email}' || email === 'undefined' ||
        validator.isEmpty(telephone) || telephone === '{telephone}' || telephone === 'undefined' ||
        validator.isEmpty(site_web) || site_web === '{site_web}' || site_web === 'undefined' ||
        validator.isEmpty(passwd) || passwd === '{passwd}' || passwd === 'undefined' ||
        id_type === '{id_type}' || id_type === 'undefined') {
        return res.status(400).send({success:0,data: "Bad request, veuillez remplir tous les champs."});

    } else if (validator.isInt(idPrestataire) && validator.isAscii(nom) && validator.isEmail(email) && validator.isAscii(telephone)
        && validator.isAscii(site_web) && validator.isAscii(passwd)) {
        services.updatePrestataire(idPrestataire, nom, email, telephone, site_web, passwd,id_type, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({success: 0, data: error});
            }
            return res.status(200).json(results);
        })
    } else {
        return res.status(400).send({success: 0, data: "Bad request!"});
    }
}

// exports.getClassementCourse = async (req, res) => {
//     console.log(chalk.green.inverse('requete pour tous les types et caractéristiques des prestataires'));
//     await services.getClassementCourse( req.params.idCourse, (err, results) => {
//         if(err){
//             return res.status(400).send({success:0, data: err})
//         }
//         return res.status(200).send({success:1, data: results})
//     })
// }

exports.addCommentaire = async (req, res) => {
    console.log(req.body);
    services.addCommentaire(req.body, async (error, results) => {
        console.log(chalk.green.inverse("Requete pour ajouter un commentaire"));
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERREUR : Ajout impossible`));
            return res.status(401).send({success:0, data: `ERREUR : Ajout impossible`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Requête pour addCommentaire`));
            return res.status(200).send({success:1, data: results});
        }
    });
}