//Import pool and queries
const pool = require("../database/db");
const queries = require("../queries/authentification_queries");

/**
 */
const getUser = (email, callback) => {
    if (email !== null) {
        email = '%'+email
        console.log(email)
        pool.query(queries.getUser, [email], (error, results) => {
            if (error) {
                console.log("error");
                return callback(error);
            }
            else {
                console.log('success');
                return callback(null, results.rows);
            }
        });
    } else {
        return callback([]);
    }
}

module.exports = {
    getUser: getUser
}