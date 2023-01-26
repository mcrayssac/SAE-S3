const pool = require("../database/db");
const signupQueries = require("../queries/competition_queries");

exports.getCompetition = async (callback) => {
    let filtres = []
    await pool.query(signupQueries.getKm, (async (error, results) => {
        if (error)
            return callback(error)
        else {
            let temp = []
            for (const elt of results.rows) {
                temp.push(Object.values(elt)[0]);
            }
            filtres.push([Object.keys(results.rows[0])[0], temp]);
            await pool.query(signupQueries.getPlace, (async (error, results) => {
                if (error)
                    return callback(error)
                else {
                    let temp = []
                    for (const elt of results.rows) {
                        temp.push(Object.values(elt)[0]);
                    }
                    filtres.push([Object.keys(results.rows[0])[0], temp]);
                    await pool.query(signupQueries.getPrix, (async (error, results) => {
                        if (error)
                            return callback(error)
                        else {
                            let temp = []
                            for (const elt of results.rows) {
                                temp.push(Object.values(elt)[0]);
                            }
                            filtres.push([Object.keys(results.rows[0])[0], temp]);
                            await pool.query(signupQueries.getType, (async (error, results) => {
                                if (error)
                                    return callback(error)
                                else {
                                    let temp = []
                                    for (const elt of results.rows) {
                                        temp.push(Object.values(elt)[0]);
                                    }
                                    filtres.push([Object.keys(results.rows[0])[0], temp]);
                                    await pool.query(signupQueries.getLieu, (async (error, results) => {
                                        if (error)
                                            return callback(error)
                                        else {
                                            let temp = []
                                            for (const elt of results.rows) {
                                                temp.push(Object.values(elt)[0]);
                                            }
                                            filtres.push([Object.keys(results.rows[0])[0], temp]);
                                            await pool.query(signupQueries.getCompetition, ((error, results) => {
                                                if (error)
                                                    return callback(error)
                                                else {
                                                    let temp = []
                                                    for (const elt of results.rows) {
                                                        let object = {title: elt.title};
                                                        object.UrlImage = elt.UrlImage;
                                                        object.idCourse = elt.idCourse;
                                                        delete elt.title;
                                                        delete elt.idCourse;
                                                        delete elt.UrlImage;
                                                        object.filtres = { title: Object.keys(elt), body: Object.values(elt)}
                                                        temp.push(object);
                                                    }
                                                    return callback(null, {title: "Compétitions", getFiltres: filtres, getCards: temp})
                                                }
                                            }))
                                        }
                                    }))
                                }
                            }))
                        }
                    }))
                }
            }))
        }
    }))
    //return callback(null, {title: "Compétitions", filtres: results.rows})
}