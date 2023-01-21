const chalk = require("chalk");
const services = require("../services/resultat_service");


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
