const services = require("../services/services");
const chalk = require("chalk");

exports.restaurants = (req, res) => {
    console.log(chalk.green.inverse('Requete pour les restaurants reçue.'));
    let type = "restaurants";
    res.send({
        title: "Restaurants",
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

exports.clubs = (req, res) => {
    console.log(chalk.green.inverse('Requete pour les clubs reçue.'));
    let type = "clubs";
    res.send({
        title: "Clubs",
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

exports.club = (req, res) => {
    console.log(chalk.green.inverse('Requete pour les clubs reçue.'));
    let type = "jdadijonbasket";
    res.send({
        getClub: services.getClub(type, (error, results) => {
            if (error) return error
            else return results
        })
    });
}

exports.signup = (req, res) => {
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
        res.locals.flashMessages.success = session.username // Modifie directement le champ dans flashmessage
        res.redirect("/orga");
    } else if(session.username){
        res.locals.flashMessages.success = session.username // Modifie directement le champ dans flashmessage
        res.redirect("/home");
    } else {
        res.render('public/login/login.hbs', {
            layout: 'mainHome.hbs'
        });
    }
}

exports.authenticateUser = (req, res, next) => {
    let data = {username: req.body.user_name_email, password: req.body.password};
    services.authenticate(data, (error, results) => {
        if (error){
            req.flash("error", error); //Envoi un flash
            res.locals.redirect = "/login"; //Redirect vers login
            next();
        }
        req.flash("success", `${results}`);
        res.locals.redirect = "/";
        req.session.username = data.username; //Créer la session
        console.log(req.session);
        next();
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
}