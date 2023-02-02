const pool = require("../database/db");
const queries = require("../queries/initiations_queries");

exports.getAllInitiations = async (idPresta, callback) => {
    await pool.query(queries.getAllInitiations, [idPresta], ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}

exports.addInitiation = (dateDebut, dateFin, nbPlaces, idPresta, title, callback) => {
    try {
        pool.query(queries.addInitiation, [dateDebut, dateFin, nbPlaces, idPresta, title], ((error, results) => {
            if (error)
                return callback(error)
            else return callback(null, "success addInitiation")
        }))
    } catch (e) {console.log("err addInitiation : ", e)}
}