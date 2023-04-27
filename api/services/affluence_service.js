const pool = require("../database/db");
const queries = require("../queries/affluence_queries");

exports.getAffluence = async (idPresta, callback) => {
    await pool.query(queries.getAffluence, [idPresta], ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows[0])
        }
    }))
}

exports.setAffluence = async (idPresta, idAffluence, callback) => {
    console.log("presta : " + idPresta)
    console.log("aff : " + idAffluence)
    await pool.query(queries.setAffluence, [idPresta, idAffluence], ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, "setAffluence succeed")
        }
    }))
}