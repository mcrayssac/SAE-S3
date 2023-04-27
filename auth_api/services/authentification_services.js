/**
 * Import pool and queries
 */
const pool = require("../database/db");
const queries = require("../queries/authentification_queries");
const chalk = require("chalk");
const Ajv = require("ajv")
const ajv = new Ajv()


/**
 * Functions
 */

/**
 * Function to get an user
 * @param email
 * @param pwd
 * @param callback
 * @returns {Promise<*>}
 */
exports.getUser = async (email, pwd, callback) => {
    if (email !== null) {
        await pool.query(queries.getPublic, [email, pwd], async (error, results) => {
            if (error) {
                console.log("error");
                return callback(error);
            } else if (results.rowCount === 0) {
                await pool.query(queries.getPrestataire, [email, pwd], async (error, results) => {
                    if (error) {
                        console.log("error");
                        return callback(error);
                    } else if (results.rowCount === 0) {
                        await pool.query(queries.getOrganisateur, [email, pwd], async (error, results) => {
                            if (error) {
                                console.log("error");
                                return callback(error);
                            } else if (results.rowCount === 0) {
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

/**
 * Function to create an user
 * @param form
 * @param admin
 * @param callback
 * @returns {Promise<void>}
 */
exports.create = async (form, admin, callback) => {
    if (form) {
        if (admin === "prestataire") {
            const schema = {
                type: "object",
                properties: {
                    name: {type: "string"},
                    email: {type: "string"},
                    number: {type: "string", minLength: 10, maxLength: 10},
                    site: {type: "string"},
                    password: {type: "string",minLength: 5},
                    password2: {type: "string", minLength: 5},
                    image: {type: "string"},
                    type: {type: "integer"},
                    caracteristiques: {type: "array"}
                },
                additionalProperties: false,
                required: ["email", "name", "number", "site", "password", "password2", "image", "type"]
            }
            const validate = ajv.compile(schema)
            if(!validate(form, schema)) {
                return callback("Bad data");
            }

            console.log("Requete", form.name, form.email, form.number, form.site, form.password, form.image, form.type)
            await pool.query(queries.createPrestataire, [form.name, form.email, form.number, form.site, form.password, form.image, form.type], async (error, results) => {
                if (error) {
                    console.log("error");
                    return callback(error);
                } else {
                    const schema = {
                        type: "object",
                        properties: {
                            firstname: {type: "string"},
                            name: {type: "string"},
                            email: {type: "string"},
                            password: {type: "string",minLength: 5},
                            password2: {type: "string", minLength: 5},
                            language: {type: "integer"},
                            year: {type: "integer"},
                            gender: {type: "integer"},
                            country: {type: "integer"}
                        },
                        additionalProperties: false,
                        required: ["firstname", "name", "email", "password", "password2", "language", "year", "gender", "country"]
                    }
                    const validate = ajv.compile(schema)
                    if(!validate(form, schema)) {
                        return callback("Bad data");
                    }

                    console.log('success');
                    await pool.query(queries.getIdPrestataire, [form.email], async (error, results) => {
                        if (error) {
                            console.log("error");
                            return callback(error);
                        } else if (results.rowCount === 0) {
                            console.log("error getIdPrestataire");
                            return callback("error getIdPrestataire");
                        } else {
                            console.log('success');
                            let id = results.rows[0].id_prestataire;
                            let c = 0;
                            for await (const elt of form.caracteristiques) {
                                await pool.query(queries.insertDetient, [id, elt], async (error, results) => {
                                    if (error) {
                                        console.log("error");
                                        return callback(error);
                                    } else {
                                        console.log('success');
                                        c++;
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
        } // Add the other cases for "prestataire" and "organisateur" above this
        else if (admin === "google") {
            console.log(chalk.bold.bgYellow('Passport callback function fired!'));
            const googleAuth = async (accessToken, refreshToken, profile, done) => {
                let user = {};
                const email = profile.emails[0].value;
                const account = profile._json;

                try {
                    const currentUserQuery = await pool.query('SELECT * FROM public WHERE google_id = $1', [account.sub]);
                    if (currentUserQuery.rows.length === 0) {
                        await pool.query('INSERT INTO public (prenom_public, nom_public, email_public, passwd_public, id_langue, id_age, id_sexe, id_pays, google_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [account.given_name, account.family_name, email, '123', 1, 1, 1, 1, account.sub]);
                        const id = await pool.query('SELECT id_public FROM public WHERE google_id = $1', [account.sub]);

                        user = {
                            id: id.rows[0].id_public,
                            prenom: account.given_name,
                            nom: account.family_name,
                            email: email
                        };

                        console.log(chalk.bgGreen("NEW USER :"), user);
                        return done(null, user);
                    } else {
                        // User exists
                        user = {
                            id: currentUserQuery.rows[0].id_public,
                            prenom: currentUserQuery.rows[0].prenom_public,
                            nom: currentUserQuery.rows[0].nom_public,
                            email: currentUserQuery.rows[0].email_public
                        };

                        console.log(chalk.bgBlue("EXISTING USER :"), user);
                        return done(null, user);
                    }
                } catch (err) {
                    console.log(err.message);
                    return done(err);
                }
            };
            await googleAuth(form.accessToken, form.refreshToken, form.profile, (err, user) => {
                if(err) {
                    console.log(chalk.bgRed("Error for google !"));
                    return callback(err);
                } else {
                    console.log("Success for google !");
                    return callback(null, user);
                }
            });
        }
    }
}

exports.userDelete = async (id, callback) => {
    if (id) {
        /* Select User */
        await pool.query(queries.selectUser, [id], async (error, results) => {
            if (error) {
                console.log("error selectUser");
                return callback(error);
            } else if (results.rowCount === 0) {
                console.log("No user");
                return callback("No user");
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
    } else {
        return callback("No id");
    }
}