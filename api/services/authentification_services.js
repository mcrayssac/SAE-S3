//Import pool and queries
const pool = require("../database/db");
const queries = require("../queries/authentification_queries");

/**
 */
const getUser = async (email, pwd, callback) => {
    if (email !== null) {
        email = '%'+email, pwd = '%'+pwd;
        await pool.query(queries.getPublic, [email, pwd], async (error, results) => {
            if (error) {
                console.log("error");
                return callback(error);
            } else if (results.rowCount === 0){
                await pool.query(queries.getPrestataire, [email, pwd], async (error, results) => {
                    if (error) {
                        console.log("error");
                        return callback(error);
                    } else if (results.rowCount === 0){
                        await pool.query(queries.getOrganisateur, [email, pwd], async (error, results) => {
                            if (error) {
                                console.log("error");
                                return callback(error);
                            } else if (results.rowCount === 0){
                                console.log("No user found");
                                return callback("No user found");
                            } else {
                                console.log('success');
                                results.rows[0].admin = 'organisateur';
                                console.log(results.rows[0]);
                                return callback(null, results.rows[0]);
                            }
                        });
                    } else {
                        console.log('success');
                        results.rows[0].admin = 'prestataire';
                        console.log(results.rows[0]);
                        return callback(null, results.rows[0]);
                    }
                });
            } else {
                console.log('success');
                results.rows[0].admin = null;
                console.log(results.rows[0]);
                return callback(null, results.rows[0]);
            }
        });
    } else {
        return callback([]);
    }
}

module.exports = {
    getUser: getUser
}