const services = require("../services/services");
const chalk = require("chalk");

exports.home = (req, res) => {
    console.log(chalk.green.inverse('Requette pour home reçue.'));
    res.render("home/home.hbs");
}