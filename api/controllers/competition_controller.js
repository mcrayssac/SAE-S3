const services = require("../services/competition_service");
const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers][Competition]");

exports.getCompetition = async (req, res) => {
    console.log(chalk.green.inverse('requete pour les competitions'));
    await services.getCompetition((err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

exports.deleteCompetition = async (req, res) => {
    console.log(chalk.green.inverse('requete pour supprimer une compétition'));
    console.log(req.params.id)
    await services.deleteCompetition(req.params.id, (err, results) => {
        if(err){
            return res.status(400).send({success:0, data: err})
        }
        return res.status(200).send({success:1, data: results})
    })
}

// exports.updateCompetition = async (req, res) => {
//     console.log(chalk.green.inverse('requete pour modifier une compétition'));
//     await services.updateCompetition(req.params.id, (err, results) => {
//         if(err){
//             return res.status(400).send({success:0, data: err})
//         }
//         return res.status(200).send({success:1, data: results})
//     })
// }
//
// exports.addCompetition = async (req, res) => {
//     console.log(chalk.green.inverse('requete pour ajouter une compétition'));
//     await services.addCompetition((err, results) => {
//         if(err){
//             return res.status(400).send({success:0, data: err})
//         }
//         return res.status(200).send({success:1, data: results})
//     })
// }