//Import pool and queries
const pool = require("../database/db");
const queries = require("../queries/authentification_queries");
const {callback} = require("pg/lib/native/query");

/**
 */
const getUser = async (email, pwd, callback) => {
    if (email !== null) {
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

const checkEmailPublic = async (email, callback) => {
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

const checkEmailPrestataire = async (email, callback) => {
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

const create = async (form, admin, callback) => {
    if (form){
        if (admin === "prestataire"){
            console.log("Requete", form.name, form.email, form.number, form.site, form.password, form.image, form.type)
            await pool.query(queries.createPrestataire, [form.name, form.email, form.number, form.site, form.password, form.image, form.type], async (error, results) => {
                if (error) {
                    console.log("error");
                    return callback(error);
                } else {
                    console.log('success');
                    await pool.query(queries.getIdPrestataire, [form.email], async (error, results) => {
                        if (error) {
                            console.log("error");
                            return callback(error);
                        } else if (results.rowCount === 0){
                            console.log("error getIdPrestataire");
                            return callback("error getIdPrestataire");
                        } else {
                            console.log('success');
                            let id = results.rows[0].id_prestataire;
                            let c = 0;
                            for await (const elt of form.caracteristiques){
                                await pool.query(queries.insertDetient, [id, elt], async (error, results) => {
                                    if (error) {
                                        console.log("error");
                                        return callback(error);
                                    } else {
                                        console.log('success');
                                        c ++;
                                    }
                                });
                            }
                            console.log(c);
                            setTimeout(() => {
                                if (c === form.caracteristiques.length) return callback(null, 'Prestataire cree !');
                                else return callback(error);
                            }, "1000");
                        }
                    });
                }
            });
        } else {
            await pool.query(queries.createPublic, [form.firstname, form.name, form.email, form.password, form.language, form.year, form.gender, form.country], async (error, results) => {
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
}

const userDelete = async (id, callback) => {
    if (id){
        /* Select User */
        await pool.query(queries.selectUser, [id], async (error, results) => {
            if (error) {
                console.log("error selectUser");
                return callback(error);
            } else if (results.rowCount === 0){
                console.log("No user");
            } else {
                console.log('success selectUser');

                /* Delete User */
                await pool.query(queries.deleteUser, [id], async (error, results) => {
                    if (error) {
                        console.log("error deleteUser");
                        return callback(error);
                    } else {
                        console.log('success deleteReservation');
                        return callback(null, "Delete user successful")
                    }
                });

            }
        });
    }
}

module.exports = {
    getUser, checkEmailPublic, checkEmailPrestataire, create, userDelete
}