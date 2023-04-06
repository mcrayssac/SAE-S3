const pool = require("../database/db");
const queries = require("../queries/demos_queries");
const demandesQueries = require("../queries/demandes_queries")
const {popArray} = require("../security/methods")

exports.getAllDemos = async (callback) => {
    await pool.query(queries.getAllDemos, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}

exports.getNbPlacesLeft = async (_id, callback) => {
    let id = popArray(_id)
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

exports.addReservation = (_idDemo, _nbPlacesReserv, _dateReserv, _idPublic, callback) => {
    try {
        let [idDemo, nbPlacesReserv, dateReserv, idPublic] = popArray([_idDemo, _nbPlacesReserv, _dateReserv, _idPublic])
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

exports.deleteDemo = (_idDemo, _date, callback) => {
    try {
        let [idDemo, date] = popArray([_idDemo, _date])
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

exports.addDemo = (_dateDebut, _dateFin, _nbPlaces, _idPresta, _title, callback) => {
    try {
        let [dateDebut, dateFin, nbPlaces, idPresta, title] = popArray([_dateDebut, _dateFin, _nbPlaces, _idPresta, _title])
        pool.query(queries.addDemo, [dateDebut, dateFin, nbPlaces, idPresta, title], ((error, results) => {
            if (error)
                return callback(error)
            else return callback(null, "success addDemo")
        }))
    } catch (e) {console.log("err addDemo : ", e)}
}

exports.updateDemo = (_id, _dateDebut, _dateFin, callback) => {
    try {
        let [id, dateDebut, dateFin] = popArray([_id, _dateDebut, _dateFin])
        pool.query(queries.updateDemo, [id, dateDebut, dateFin], ((error, results) => {
            if (error)
                return callback(error)
            else return callback(null, "success updateDemo")
        }))
    } catch (e) {console.log("err updateDemo : ", e)}
}

exports.addOrgaDemo = (_dateDebut, _dateFin, _nbPlaces, _idPresta, _title, callback) => {
    try {
        let [dateDebut, dateFin, nbPlaces, idPresta, title] = popArray([_dateDebut, _dateFin, _nbPlaces, _idPresta, _title])
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
