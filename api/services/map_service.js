const pool = require("../database/db");
const mapQueries = require("../queries/maps_queries");

exports.getCourses = async (callback) => {
    await pool.query(mapQueries.getCourses, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}


exports.getStands = async (callback) => {
    await pool.query(mapQueries.getStands, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}

exports.getAllStands = async (callback) => {
    await pool.query(mapQueries.getAllStands, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}



exports.getContraintes = async callback => {
    await pool.query(mapQueries.getContraintes, (err, results) => {
        if(err) return callback(err)
        return callback(null, results.rows)
    })
}

exports.getContraintesByStand = async callback => {
    await pool.query(mapQueries.getContraintesByStand, (err, results) => {
        if(err) return callback(err)
        return callback(null, results.rows)
    })
}


exports.getAllPrestataires = async (callback) => {
    await pool.query(mapQueries.getAllPrestataires, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}


exports.updateStandId = async (idPresta, idStand, callback) => {
    await pool.query(mapQueries.updateStandId, [idPresta, idStand], async (error, results) => {
        if (error) {
            console.log("error updateStand");
            return callback(error);
        } else {
            console.log('success updateStand');
            return callback(null, "success");
        }
    });
}


exports.getTypeCaracteristiquesPresta = async (callback) => {
    await pool.query(mapQueries.getTypeCaracteristiquesPresta, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}

exports.getCaracteristiques = async (callback) => {
    await pool.query(mapQueries.getCaracteristiques, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}


exports.getTypes = async (callback) => {
    await pool.query(mapQueries.getTypes, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}
