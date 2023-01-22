const pool = require("../database/db");
const signupQueries = require("../queries/inscription_queries");

exports.getInscriptionChoix = async (callback) => {
    let res = {};
    await pool.query(signupQueries.getLangues, async (error, results) => {
        if (error) {
            console.log("error");
            return callback(error);
        } else if (results.rowCount === 0){
            console.log("No languages found");
            return callback("No languages found");
        } else {
            console.log('success');
            res.langues = results.rows;
            await pool.query(signupQueries.getAge, async (error, results) => {
                if (error) {
                    console.log("error");
                    return callback(error);
                } else if (results.rowCount === 0){
                    console.log("No years found");
                    return callback("No years found");
                } else {
                    console.log('success');
                    res.years = results.rows;
                    await pool.query(signupQueries.getSexe, async (error, results) => {
                        if (error) {
                            console.log("error");
                            return callback(error);
                        } else if (results.rowCount === 0){
                            console.log("No gender found");
                            return callback("No gender found");
                        } else {
                            console.log('success');
                            res.gender = results.rows;
                            await pool.query(signupQueries.getPays, async (error, results) => {
                                if (error) {
                                    console.log("error");
                                    return callback(error);
                                } else if (results.rowCount === 0){
                                    console.log("No country found");
                                    return callback("No country found");
                                } else {
                                    console.log('success');
                                    res.countries = results.rows;
                                    return callback(null, res);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}



exports.getInscriptionChoixPrestataire = async (callback) => {
    await pool.query(signupQueries.getTypes, async (error, results) => {
        if (error) {
            console.log("error");
            return callback(error);
        } else if (results.rowCount === 0){
            console.log("No types found");
            return callback("No types found");
        } else {
            console.log('success');
            let type = results.rows;
            await pool.query(signupQueries.getCaracteristique, async (error, results) => {
                if (error) {
                    console.log("error");
                    return callback(error);
                } else if (results.rowCount === 0){
                    console.log("No caracteristiques found");
                    return callback("No caracteristiques found");
                } else {
                    console.log('success');
                    let type2 = []
                    let caracteristique = [];
                    for await (const elt of results.rows){
                        if (type2.includes(elt.Type)){
                            caracteristique[type2.indexOf(elt.Type)].body.push({value: elt.value, text: elt.text});
                        } else {
                            caracteristique.push({title: elt.Type, body: [{value: elt.value, text: elt.text}]});
                            type2.push(elt.Type);
                        }
                    }
                    return callback(null, {type, caracteristique})
                }
            });
        }
    });
}