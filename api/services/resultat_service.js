const pool = require("../database/db");
const signupQueries = require("../queries/resultat_queries");
const coursesQueries = require("../queries/competition_queries")
const {callback} = require("pg/lib/native/query");

exports.getResultats = async (nomCompetition, callback) => {
    if (nomCompetition){
        if (nomCompetition == "coursed'orientation"){
            pool.query(signupQueries.getResultats, ["Course d'orientation"], ((error, results)=>{
                if (error)
                    return callback(error)
                else{
                    return callback(null, {name: "Course d'orientation" ,data: results.rows})
                }
            }))
        }
        else {
            await pool.query(coursesQueries.getLoweredCompetition, [nomCompetition] , ((error, results)=>{
                if (error)
                    return callback(error)
                else{
                    let competition = results.rows[0].libelle_course
                    pool.query(signupQueries.getResultats, [competition], ((error, results)=>{
                        if (error)
                            return callback(error)
                        else{
                            return callback(null, {name: competition, data: results.rows})
                        }
                    }))
                }
            }))
        }
    } else {
        return callback("Competition not found");
    }
}

exports.getParticipants = (nomCompetition, callback) => {
    if (nomCompetition == "coursed'orientation"){
        pool.query(signupQueries.getParticipants, [1], ((error, results)=>{
            if (error)
                return callback(error)
            else{
                console.log(results.rows)
                return callback(null, results.rows)
            }
        }))
    }
    else {
        pool.query(coursesQueries.getLoweredCompetition, [nomCompetition] , ((error, results)=>{
            if (error)
                return callback(error)
            else{
                pool.query(signupQueries.getParticipants, [results.rows[0].id_course], ((error, results)=>{
                    if (error)
                        return callback(error)
                    else{
                        return callback(null, results.rows)
                    }
                }))
            }
        }))
    }
}

exports.addClassement = (nomCompet, idPublic, position, callback) => {
    if (nomCompet == "coursed'orientation"){
        pool.query(signupQueries.addClassement, [1, idPublic, position], ((error, results)=>{
            if (error)
                return callback(error)
            else{
                return callback(null, "update successful")
            }
        }))
    }
    else {
        pool.query(coursesQueries.getLoweredCompetition, [nomCompet] , ((error, results)=>{
            if (error)
                return callback(error)
            else{
                pool.query(signupQueries.addClassement, [results.rows[0].id_course, idPublic, position], ((error, results)=>{
                    if (error)
                        return callback(error)
                    else{
                        return callback(null, "update successful")
                    }
                }))
            }
        }))
    }
}