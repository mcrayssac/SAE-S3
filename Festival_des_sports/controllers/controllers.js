const services = require("../services/services");
const chalk = require("chalk");

exports.association = (req, res) => {
    console.log(chalk.green.inverse('Requete pour association reçue.'));
    let session = req.session; //Vérifier si une session active
    if(session.username) {
        res.render('public/association/association.hbs', {
            layout: 'mainHome.hbs',
            session: {username : session.username}
        });
    } else {
        res.render('public/association/association.hbs', {layout: 'mainHome.hbs'});
    }
}

exports.courses = (req, res) => {
    console.log(chalk.green.inverse('Requete pour courses reçue.'));
    let session = req.session; //Vérifier si une session active
    if(session.username) {
        res.render('public/activites/competitions/courses.hbs', {
            layout: 'mainHome.hbs',
            filtres: services.getFiltresCourses("courses", (error, results) => {
                if (error) return error
                else return results
            }),
            courses: services.getCourses((error, results) => {
                if (error) return error
                else return results
            }),
            session: {username : session.username}
        });
    } else {
        res.render('public/activites/competitions/courses.hbs', {
            layout: 'mainHome.hbs',
            filtres: services.getFiltresCourses("courses", (error, results) => {
                if (error) return error
                else return results
            }),
            courses: services.getCourses((error, results) => {
                if (error) return error
                else return results
            })
        });
    }
}

exports.restaurants = (req, res) => {
    console.log(chalk.green.inverse('Requete pour les restaurants reçue.'));
    let session = req.session; //Vérifier si une session active
    if(session.username) {
        res.render('prestataire/restaurants/restaurants.hbs', {
            layout: 'mainHome.hbs',
            filtres: services.getFiltresRestaurants("restaurants", (error, results) => {
                if (error) return error
                else return results
            }),
            restaurants: services.getRestaurants((error, results) => {
                if (error) return error
                else return results
            }),
            session: {username : session.username}
        });
    } else {
        res.render('prestataire/restaurants/restaurants.hbs', {
            layout: 'mainHome.hbs',
            filtres: services.getFiltresRestaurants("restaurants", (error, results) => {
                if (error) return error
                else return results
            }),
            restaurants: services.getRestaurants((error, results) => {
                if (error) return error
                else return results
            })
        });
    }
}

exports.clubs = (req, res) => {
    console.log(chalk.green.inverse('Requete pour les restaurants reçue.'));
    let session = req.session; //Vérifier si une session active
    if(session.username) {
        res.render('prestataire/clubs/clubs.hbs', {
            layout: 'mainHome.hbs',
            filtres: services.getFiltresClubs("restaurants", (error, results) => {
                if (error) return error
                else return results
            }),
            clubs: services.getClubs((error, results) => {
                if (error) return error
                else return results
            }),
            session: {username : session.username}
        });
    } else {
        res.render('prestataire/clubs/clubs.hbs', {
            layout: 'mainHome.hbs',
            filtres: services.getFiltresClubs("restaurants", (error, results) => {
                if (error) return error
                else return results
            }),
            clubs: services.getClubs((error, results) => {
                if (error) return error
                else return results
            })
        });
    }
}

exports.club = (req, res) => {
    console.log(chalk.green.inverse('Requete pour club reçue.'));
    let session = req.session; //Vérifier si une session active
    if(session.username) {
        res.render('prestataire/prestataires/club.hbs', {
            layout: 'mainHome.hbs',
            club: services.getClub(req.body.club, (error, results) => {
                if (error) return error
                else return results
            }),
            session: {username : session.username}
        });
    } else {
        res.render('prestataire/prestataires/club.hbs', {
            layout: 'mainHome.hbs',
            club: services.getClub(req.body.club, (error, results) => {
                if (error) return error
                else return results
            })
        });
    }
}

exports.surnameName = (req, res) => {
    console.log(chalk.green.inverse('Requete pour surnameName reçue.'));
    res.render('surnameName/surnameName.hbs', {layout: 'mainSurnameName.hbs'});
}

exports.orga = (req, res) => {
    console.log(chalk.green.inverse('Requete pour orga reçue.'));
    res.render('surnameName/surnameName.hbs', {layout: 'mainOrga.hbs'});
}

exports.home = (req, res) => {
    console.log(chalk.green.inverse('Requete pour home reçue.'));
    let session = req.session; //Vérifier si une session active
    if(session.username){
        res.render('home/home.hbs', {
            layout: 'mainHome.hbs',
            cagnotte: services.getCagnotte((error, results) => {
                if (error) return error
                else return results
            }),
            session: {username : session.username}
        });
    } else {
        res.render('home/home.hbs', {
            layout: 'mainHome.hbs',
            cagnotte: services.getCagnotte((error, results) => {
                if (error) return error
                else return results
            })
        }); //Si pas auth alors redirect
    }
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
    if(session.username){
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
    let redirectPath = res.locals.redirect;
    res.redirect(redirectPath);
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/home");
}