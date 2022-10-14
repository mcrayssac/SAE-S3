const services = require("../services/services");
const chalk = require("chalk");

exports.association = (req, res) => {
    console.log(chalk.green.inverse('Requete pour association reçue.'));
    res.render('association/association.hbs', {layout: 'mainHome.hbs'});
}

exports.surnameName = (req, res) => {
    console.log(chalk.green.inverse('Requete pour surnameName reçue.'));
    res.render('surnameName/surnameName.hbs', {layout: 'mainSurnameName.hbs'});
}

exports.home = (req, res) => {
    console.log(chalk.green.inverse('Requete pour home reçue.'));
    res.render('home/home.hbs', {layout: 'mainHome.hbs'});
}