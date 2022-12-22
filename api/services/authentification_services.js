//Import pool and queries
const pool = require("../database/db");
const queries = require("../queries/authentification_queries");
const {callback} = require("pg/lib/native/query");

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

const checkEmail = async (email, callback) => {
    if (email){
        email = '%'+email
        await pool.query(queries.getEmail, [email], async (error, results) => {
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

const create = async (form, callback) => {
    if (form){
        await pool.query(queries.createUser, [form.firstname, form.name, form.email, form.password, form.language, form.year, form.gender, form.country], async (error, results) => {
            if (error) {
                console.log("error");
                return callback(error);
            } else {
                console.log('success');
                return callback(null, results);
            }
        });
    }
}

module.exports = {
    getUser, checkEmail, create
}