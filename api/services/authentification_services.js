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

                /* Notes */
                await pool.query(queries.selectNote, [id], async (error, results) => {
                    if (error) {
                        console.log("error selectNote");
                        return callback(error);
                    } else if (results.rowCount === 0){
                        console.log("No notes");
                    } else {
                        console.log('success selectNote');
                        await pool.query(queries.deleteNote, [id], async (error, results) => {
                            if (error) {
                                console.log("error deleteNote");
                                return callback(error);
                            } else {
                                console.log('success deleteNote');
                            }
                        });
                    }
                });

                /* Commentaires */
                await pool.query(queries.selectCommentaire, [id], async (error, results) => {
                    if (error) {
                        console.log("error selectCommentaire");
                        return callback(error);
                    } else if (results.rowCount === 0){
                        console.log("No commentaires");
                    } else {
                        console.log('success selectCommentaire');
                        await pool.query(queries.deleteCommentaire, [id], async (error, results) => {
                            if (error) {
                                console.log("error deleteCommentaire");
                                return callback(error);
                            } else {
                                console.log('success deleteCommentaire');
                            }
                        });
                    }
                });

                /* Participe */
                await pool.query(queries.selectParticipe, [id], async (error, results) => {
                    if (error) {
                        console.log("error selectParticipe");
                        return callback(error);
                    } else if (results.rowCount === 0){
                        console.log("No participe");
                    } else {
                        console.log('success selectParticipe');
                        await pool.query(queries.deleteParticipe, [id], async (error, results) => {
                            if (error) {
                                console.log("error deleteParticipe");
                                return callback(error);
                            } else {
                                console.log('success deleteParticipe');
                            }
                        });
                    }
                });

                /* Reservation, course, pour et a_propos */
                await pool.query(queries.selectReservation, [id], async (error, results) => {
                    if (error) {
                        console.log("error selectReservation");
                        return callback(error);
                    } else if (results.rowCount === 0){
                        console.log("No reservation");
                    } else {
                        console.log('success selectReservation');
                        //Pour
                        await pool.query(queries.selectPour, [id], async (error, results) => {
                            if (error) {
                                console.log("error selectPour");
                                return callback(error);
                            } else if (results.rowCount === 0){
                                console.log("No pour");
                            } else {
                                console.log('success selectPour');
                                await pool.query(queries.deletePour, [id], async (error, results) => {
                                    if (error) {
                                        console.log("error deletePour");
                                        return callback(error);
                                    } else {
                                        console.log('success deletePour');
                                    }
                                });
                            }
                        });
                        //A_propos
                        await pool.query(queries.selectA_propos, [id], async (error, results) => {
                            if (error) {
                                console.log("error selectA_propos");
                                return callback(error);
                            } else if (results.rowCount === 0){
                                console.log("No a_propos");
                            } else {
                                console.log('success selectA_propos');
                                await pool.query(queries.deleteA_propos, [id], async (error, results) => {
                                    if (error) {
                                        console.log("error deleteA_propos");
                                        return callback(error);
                                    } else {
                                        console.log('success deleteA_propos');
                                    }
                                });
                            }
                        });
                        //Delete Réservation
                        await pool.query(queries.deleteReservation, [id], async (error, results) => {
                            if (error) {
                                console.log("error deleteReservation");
                                return callback(error);
                            } else {
                                console.log('success deleteReservation');
                            }
                        });
                    }
                });

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
    getUser, checkEmail, create, userDelete
}