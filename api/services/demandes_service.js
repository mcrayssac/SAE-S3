const pool = require("../database/db");
const signupQueries = require("../queries/signup_queries");

exports.getDemandesPrestataires = async (callback) => {
    await pool.query(signupQueries.getDemandesPrestataires, async (error, results) => {
        if (error) {
            console.log("error getDemandesPrestataires");
            return callback(error);
        } else if (results.rowCount === 0){
            console.log('success getDemandesPrestataires');
            return callback(null, 0);
        } else {
            console.log('success getDemandesPrestataires');
            return callback(null, results.rows);
        }
    });
}

exports.postDemandesPrestataires = async (choice, id, callback) => {
    console.log(choice, id);
    if (choice === "accept" && id){
        await pool.query(signupQueries.postDemandesPrestatairesTrue, [id], async (error, results) => {
            if (error) {
                console.log("error postDemandesPrestatairesTrue");
                return callback(error);
            } else {
                console.log('success postDemandesPrestatairesTrue');
                return callback(null, "success");
            }
        });
    } else if (choice === "decline" && id){
        await pool.query(signupQueries.postDemandesPrestatairesFalse, [id], async (error, results) => {
            if (error) {
                console.log("error postDemandesPrestatairesFalse");
                return callback(error);
            } else {
                console.log('success postDemandesPrestatairesFalse');
                return callback(null, "success");
            }
        });
    } else {
        console.log("error postDemandesPrestatairesTrue");
        return callback("error postDemandesPrestatairesTrue");
    }

}