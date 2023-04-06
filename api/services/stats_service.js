const pool = require("../database/db");
const signupQueries = require("../queries/stats_queries");
const {popArray} = require("../security/methods")

exports.getClicsPrestataire = async (_id, callback) => {
    let id = popArray(_id)
    if (id){
        console.log(id);
        await pool.query(signupQueries.getClicsPrestataire, [id], async (error, results) => {
            if (error) {
                console.log("error getClicsPrestataire");
                return callback(error);
            } else if (results.rows.length === 0) {
                console.log("success getClicsPrestataire");
                return callback(null, false);
            } else {
                console.log('success getClicsPrestataire');
                let temp = [];
                let sum = 0;
                for (const elt of results.rows) {
                    temp.push([elt.x, parseInt(elt.y)]);
                    sum += parseInt(elt.y);
                }
                sum /= temp.length;
                sum = Math.round(sum * 1000) / 1000;
                let down = [0, sum - sum / 2];
                //console.log(temp, sum, down);
                return callback(null, {temp, sum, down});
            }
        });
    }
}

exports.putClicsPrestataire = async (_id, callback) => {
    let id = popArray(_id)
    if (id) {
        console.log(id);
        await pool.query(signupQueries.putClicsPrestataire, [parseInt(id)], async (error, results) => {
            if (error) {
                console.log("error putClicsPrestataire");
                return callback(error);
            } else {
                console.log('success putClicsPrestataire');
                return callback(null, "putClicsPrestataire");
            }
        });
    } else {
        console.log("error putClicsPrestataire");
        return callback("error putClicsPrestataire");
    }
}
