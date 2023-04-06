const pool = require("../database/db");
const queries = require("../queries/initiations_queries");
const {popArray} = require("../security/methods")

exports.getAllInitiations = async (_idPresta, callback) => {
    let idPresta = popArray(_idPresta)
    await pool.query(queries.getAllInitiations, [idPresta], ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}

exports.addInitiation = (_dateDebut, _dateFin, _nbPlaces, _idPresta, _title, callback) => {
    try {
        let [dateDebut, dateFin, nbPlaces, idPresta, title] = popArray([_dateDebut, _dateFin, _nbPlaces, _idPresta, _title])
        pool.query(queries.addInitiation, [dateDebut, dateFin, nbPlaces, idPresta, title], ((error, results) => {
            if (error)
                return callback(error)
            else return callback(null, "success addInitiation")
        }))
    } catch (e) {console.log("err addInitiation : ", e)}
}
