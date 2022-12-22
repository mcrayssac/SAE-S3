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
    console.log(chalk.green.inverse("requete pour les choix d'insciption"));
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


/*exports.signup = (req, res) => {
    console.log(chalk.green.inverse('Requete pour signup reçue.'));
    res.render('public/signup/signup.hbs', {
        layout: 'mainHome.hbs',
        sexe: services.getSexe((error, results) => {
            if (error) return error
            else return results
        })
    });
}

exports.login = (req, res) => {
    console.log(chalk.green.inverse('Requete pour login reçue.'));
    let session = req.session;
    console.log(session);
    if(session.username === 'admin'){
        res.send(req.session);
    } else {
        res.send(null);
    }
    /*if(session.username === 'admin'){
        res.locals.flashMessages.success = session.username // Modifie directement le champ dans flashmessage
        res.redirect("/orga");
    } else if(session.username){
        res.locals.flashMessages.success = session.username // Modifie directement le champ dans flashmessage
        res.redirect("/home");
    } else {
        res.render('public/login/login.hbs', {
            layout: 'mainHome.hbs'
        });
    }*//*
}

exports.authenticateUser = (req, res) => {
    let data = {email: req.params.email, password: req.params.password}
    console.log(data);
    //let data = {username: req.body.user_name_email, password: req.body.password};
    services.authenticate(data, (error, results) => {
        if (error){
            /*req.flash("error", error); //Envoi un flash
            res.locals.redirect = "/login"; //Redirect vers login*//*
            res.send(error);
        } else {
            /*req.flash("success", `${results}`);
            res.locals.redirect = "/";*//*
            req.session.username = data.email; //Créer la session
            console.log(req.session);
            res.send(req.session);
        }
    });
}

exports.redirectView = (req, res) => {
    if(req.session.username === 'admin'){
        res.locals.flashMessages.success = req.session.username // Modifie directement le champ dans flashmessage
        res.redirect("/orga");
    } else {
        let redirectPath = res.locals.redirect;
        res.redirect(redirectPath);
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/home");
}*/