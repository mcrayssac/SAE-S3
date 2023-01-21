const pool = require("../database/db");
const signupQueries = require("../queries/signup_queries");


exports.addReservationCourse = async (data, callback) => {
    if (data.date, data.idPublic, data.idCourse) {
        console.log(data.date, data.idPublic, data.idCourse);
        await pool.query(signupQueries.verifyReservation, [data.idPublic, data.idCourse], async (error, results) => {
            if (error) {
                console.log("error verifyReservation");
                return callback(error);
            } else if (results.rowCount === 0) {
                await pool.query(signupQueries.addPeriode, [data.date], async (error, results) => {
                    if (error) {
                        console.log("error addPeriode");
                        return callback(error);
                    } else {
                        console.log('success addPeriode');
                        await pool.query(signupQueries.addReservation, [data.date, data.idPublic], async (error, results) => {
                            if (error) {
                                console.log("error addReservation");
                                return callback(error);
                            } else {
                                console.log('success addReservation');
                                await pool.query(signupQueries.getReservation, [data.date, data.idPublic], async (error, results) => {
                                    if (error) {
                                        console.log("error getReservation");
                                        return callback(error);
                                    } else if (results.rowCount === 0) {
                                        console.log("error getReservation");
                                        return callback(error);
                                    } else {
                                        console.log('success getReservation');
                                        let idReservation = results.rows[0].id_reservation;
                                        console.log(data.idCourse, idReservation);
                                        await pool.query(signupQueries.addPour, [data.idCourse, idReservation], async (error, results) => {
                                            if (error) {
                                                console.log("error addPour");
                                                return callback(error);
                                            } else {
                                                console.log('success addPour');
                                                return callback(null, "addReservationCourse");
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                console.log("error addReservationCourse");
                return callback(false);
            }
        });
    } else {
        console.log("error addReservationCourse");
        return callback("error addReservationCourse");
    }
}