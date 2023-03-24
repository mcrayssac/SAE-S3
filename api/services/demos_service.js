const pool = require("../database/db");
const queries = require("../queries/demos_queries");
const demandesQueries = require("../queries/demandes_queries")

exports.getAllDemos = async (callback) => {
    await pool.query(queries.getAllDemos, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}

exports.getNbPlacesLeft = async (id, callback) => {
    await pool.query(queries.getNbPlacesLeft, [id], ( (error, results)=>{
        if (error)
            return callback(error)
        else{
            pool.query(queries.getNbTotalPlaces, [id], ( (error, result)=>{
                if (error)
                    return callback(error)
                else{
                    return callback(null,{total_reserv : parseInt(results.rows[0].total_reserv), nb_places : result.rows[0].nb_places})
                }
            }))
        }
    }))
}

exports.addReservation = (idDemo, nbPlacesReserv, dateReserv, idPublic, callback) => {
    try {
        pool.query(queries.addReservation, [dateReserv, idPublic], ((error, results) => {
            if (error)
                return callback(error)
            else {
                pool.query(queries.getMaxIdReservation, ((err, maxId) => {
                    if (error) return callback(err)
                    else{
                        pool.query(queries.addAPropos, [idDemo, maxId.rows[0].max ,nbPlacesReserv], ((err, result) => {
                            if (error) return callback(err)
                            else return callback(null, "success addReservation")
                        }))
                    }
                }))
            }
        }))
    }catch(e){ console.log("err addReservation : ", e)}
}

exports.deleteDemo = (idDemo, date, callback) => {
    try {
        pool.query(queries.deleteReservationsAPropos, [idDemo], ((error, results) => {
            if (error)
                return callback(error)
            else {
                pool.query(queries.deleteReservations, [date], ((err, resultats) => {
                    if (error) return callback(err)
                    else {
                        pool.query(queries.deleteDemo, [idDemo], ((errr, result) => {
                            if (error) return callback(errr)
                            else return callback(null, "success deleteDemo")
                        }))
                    }
                }))
            }
        }))
    } catch (e) {console.log("err deleteDemo : ", e)}
}

exports.addDemo = (dateDebut, dateFin, nbPlaces, idPresta, title, callback) => {
    try {
        pool.query(queries.addDemo, [dateDebut, dateFin, nbPlaces, idPresta, title], ((error, results) => {
            if (error)
                return callback(error)
            else return callback(null, "success addDemo")
        }))
    } catch (e) {console.log("err addDemo : ", e)}
}

exports.updateDemo = (id, dateDebut, dateFin, callback) => {
    try {
        pool.query(queries.updateDemo, [id, dateDebut, dateFin], ((error, results) => {
            if (error)
                return callback(error)
            else return callback(null, "success updateDemo")
        }))
    } catch (e) {console.log("err updateDemo : ", e)}
}

exports.addOrgaDemo = (dateDebut, dateFin, nbPlaces, idPresta, title, callback) => {
    try {
        pool.query(queries.addDemo, [dateDebut, dateFin, nbPlaces, idPresta, title], ((error, results) => {
            if (error)
                return callback(error)
            else {
                pool.query(queries.getMaxIdDemos, ((err, maxId) => {
                    if (error) return callback(err)
                    else{
                        pool.query(demandesQueries.postDemandesActivitesTrue, [idPresta, maxId.rows[0].max], ((err, result) => {
                            if (error) return callback(err)
                            else return callback(null, maxId.rows[0].max)
                        }))
                    }
                }))
            }
        }))
    }catch(e){ console.log("err addOrgaDemo : ", e)}
}