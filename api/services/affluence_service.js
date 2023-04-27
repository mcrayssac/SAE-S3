const pool = require("../database/db");
const queries = require("../queries/affluence_queries");

exports.getAffluence = async (idPresta, callback) => {
    const {popArray} = require("../security/methods")

    exports.getAffluence = async (_idPresta, callback) => {
        let idPresta = popArray(_idPresta)
        await pool.query(queries.getAffluence, [idPresta], ((error, results) => {
            if (error)
                return callback(error)
            else {
                return callback(null, results.rows[0])
            }
        }))
    }

    exports.setAffluence = async (idPresta, idAffluence, callback) => {
        console.log("presta : " + idPresta)
        console.log("aff : " + idAffluence)

        exports.setAffluence = async (_idPresta, _idAffluence, callback) => {
            let [idPresta, idAffluence] = popArray([_idPresta, _idAffluence])
            await pool.query(queries.setAffluence, [idPresta, idAffluence], ((error, results) => {
                if (error)
                    return callback(error)
                else {
                    return callback(null, "setAffluence succeed")
                }
            }))
        }
    }
}