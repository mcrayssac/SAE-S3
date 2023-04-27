const services = require("../services/prestataires_services");
const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers]");
const validator = require("validator");


exports.getPrestataire = async (req, res) => {
    console.log(chalk.green.inverse('Requete pour les getPrestataire reçue.'));
    let type = req.params.nomPrestataire;
    console.log("type : ", type);
    await services.getAllPrestataire(type,(err, results) => {
        if (err) {
            return res.status(400).send({success: 0, data: err});
        } else {
            return res.status(200).send({success: 1, data: results});
        }
    });
}

exports.getPrestataireCommentaire = async (req, res) => {
    console.log(chalk.green.inverse('Requete pour les getPrestataireCommentaire reçue.'));
    const id = req.params.id_presta;
    await services.getClubCommentaire(id,(err, results) => {
        if (err) {
            return res.status(400).send({success: 0, data: err});
        } else {
            console.log(results)
            return res.status(200).send({success: 1, data: results});
        }
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

// Swager
exports.getPrestataireById = (req, res) => {
    const idPrestataire = parseInt(req.params.idPrestataire);

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
        return res.status(400).send({success: 0, data: "Bad request1!"});
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
        return res.status(400).send({success: 0, data: "Bad request1!"});
    }
}

exports.addCommentaire = async (req, res) => {
    console.log(req.body);
    await services.addCommentaire(req.body, async (error, results) => {
        console.log(chalk.green.inverse("Requete pour ajouter un commentaire"));
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERREUR : Ajout impossible`));
            return res.status(401).send({success:0, data: `ERREUR : Ajout impossible`});
        } else {
            console.log(chalk.green.inverse(`${chalkController} Requête pour addCommentaire`));
            console.log(results)
            return res.status(200).send({success:1, data: {
                libelle_commentaire: req.body.commentaire, libelle_note: req.body.note, nom_public: req.body.surname}});
        }
    });
}


exports.aPosteCommentaire = async (req, res) => {
    await services.aPosteCommentaire(req.params.idPresta, req.params.idPublic, async (error, results) => {
        console.log(chalk.green.inverse("Requête pour écupérer les commentaires postées pour ce prestataire par ce public"));
        if (error) {
            console.log("ici",error);
            res.status(400).send({success: 0, data: error});
        }
        console.log(results);
        res.status(200).json(results);
    });
}

exports.getAllPrestataires = (req, res) => {
    console.log(chalk.green.inverse("Requete pour récupérer les prestataires"));
    services.getAllPrestataires((error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${chalkController} ERREUR : get impossible`));
            return res.status(401).send({success:0, data: `ERREUR : get impossible`});
        }
        else {
            return res.status(200).send(results);
        }
    })
}