const pool = require("../database/db");
const queries = require("../queries/queries");

exports.getAllOrganisateur = async (callback) => {
    await pool.query(queries.getAllOrganisateur, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}