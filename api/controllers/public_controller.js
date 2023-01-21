const services = require("../services/public_service");
const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers][Public]");
const validator = require("validator");

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
        console.log(chalk.green("Requete pour le public ID=" + idPublic + " reçue."));
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
exports.updatePublic = (req, res) => {
    console.log(chalk.green("Requete pour modifier un public recue!"));
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
        return res.status(400).send({success: 0, data: "Bad request"});
    }
}