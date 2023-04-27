const pool = require("../database/db");
const signupQueries = require("../queries/competition_queries");
const {callback} = require("pg/lib/native/query");
const validator = require("validator")
const {popArray} = require("../security/methods")

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
            if(results.rowCount != 0) {
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
                                                            object.filtres = {
                                                                title: Object.keys(elt),
                                                                body: Object.values(elt)
                                                            }
                                                            temp.push(object);
                                                        }
                                                        return callback(null, {
                                                            title: "Compétitions",
                                                            getFiltres: filtres,
                                                            getCards: temp
                                                        })
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
        }
    }))
    //return callback(null, {title: "Compétitions", filtres: results.rows})
}

exports.deleteCompetition = async (_idCompet, callback) => {
    let idCompet = popArray(_idCompet)
    pool.query(signupQueries.deleteParticipe, [idCompet], ((error, results) => {
        if (error)
            return callback(error)
        else {
            pool.query(signupQueries.deletePour, [idCompet], ((error, results) => {
                if (error)
                    return callback(error)
                else {
                    pool.query(signupQueries.deleteCompetition, [idCompet], ((error, results) => {
                        if (error)
                            return callback(error)
                        else {
                            return callback(null, "delete successful")
                        }
                    }))
                }
            }))
        }
    }))
}

exports.updateCompetition = (_id, _nom, _km, _places, _prix, _sport, _lieu, callback) => {
    let [id, nom, km, places, prix, sport, lieu] = popArray([_id, _nom, _km, _places, _prix, _sport, _lieu])
    console.log(id, nom, km, places, prix, sport, lieu)
    pool.query(signupQueries.getIdSport, [sport] ,((error, result) => {
        if (error)
            return callback(error)
        else {
            pool.query(signupQueries.getIdLieu, [lieu], ((error, results) => {
                if (error)
                    return callback(error)
                else {
                    if(result.rowCount != 0 && results.rowCount != 0 && validator.isInt(km) && validator.isInt(places) && validator.isDecimal(prix) && validator.isAscii(nom)) {
                        if(id == ""){
                            pool.query(signupQueries.addCompetition, [nom, km, places, prix, result.rows[0].id_sport, results.rows[0].id_lieu], ((error, resultats) => {
                                if (error)
                                    return callback(error)
                                else {
                                    return callback(null, "add successful")
                                }
                            }))
                        }
                        else {
                            pool.query(signupQueries.updateCompetition, [id, nom, km, places, prix, result.rows[0].id_sport, results.rows[0].id_lieu], ((error, resultats) => {
                                if (error)
                                    return callback(error)
                                else {
                                    return callback(null, "update successful")
                                }
                            }))
                        }
                    }
                    else return callback("Mauvaises entrées")
                }
            }))
        }
    }))
}

exports.getSports = (callback) => {
    pool.query(signupQueries.getSports, ((error, results) => {
        if (error)
            return callback(error)
        else {
            return callback(null, results.rows)
        }
    }))
}
