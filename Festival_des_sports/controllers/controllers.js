const services = require("../services/services");
const chalk = require("chalk");

exports.association = (req, res) => {
    console.log(chalk.green.inverse('Requete pour association reçue.'));
    res.render('public/association/association.hbs', {layout: 'mainHome.hbs'});
}

exports.restaurants = (req, res) => {
    console.log(chalk.green.inverse('Requete pour les restaurants reçue.'));
    res.render('prestataire/restaurants/restaurants.hbs', {
        layout: 'mainHome.hbs',
        filtres: services.getFiltres("restaurants", (error, results) => {
            if (error) return error
            else return results
        }),
        restaurants: services.getRestaurants((error, results) => {
            if (error) return error
            else return results
        })
    });
}

exports.surnameName = (req, res) => {
    console.log(chalk.green.inverse('Requete pour surnameName reçue.'));
    res.render('surnameName/surnameName.hbs', {layout: 'mainSurnameName.hbs'});
}

exports.home = (req, res) => {
    console.log(chalk.green.inverse('Requete pour home reçue.'));
    res.render('home/home.hbs', {
        layout: 'mainHome.hbs',
        cagnotte: services.getCagnotte((error, results) => {
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
    res.render('public/login/login.hbs', {
        layout: 'mainHome.hbs'
    });
}