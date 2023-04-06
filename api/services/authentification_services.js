//Import pool and queries
const pool = require("../database/db");
const queries = require("../queries/authentification_queries");
const {callback} = require("pg/lib/native/query");
const {popArray} = require("../security/methods")

/**
 */
const checkEmailPublic = async (_email, callback) => {
    let email = popArray(_email)
    if (email){
        await pool.query(queries.getEmailPublic, [email], async (error, results) => {
            if (error) {
                console.log("error");
                return callback(error);
            } else if (results.rowCount === 0){
                console.log("success");
                return callback(null, true);
            } else {
                console.log('Email existing');
                return callback('Email existing');
            }
        });
    }
}

const checkEmailPrestataire = async (_email, callback) => {
    let email = popArray(_email)
    if (email){
        await pool.query(queries.getEmailPrestataire, [email], async (error, results) => {
            if (error) {
                console.log("error");
                return callback(error);
            } else if (results.rowCount === 0){
                console.log("success");
                return callback(null, true);
            } else {
                console.log('Email existing');
                return callback('Email existing');
            }
        });
    }
}

module.exports = {
    checkEmailPublic, checkEmailPrestataire
}
