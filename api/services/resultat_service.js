const pool = require("../database/db");
const signupQueries = require("../queries/resultat_queries");

exports.getResultats = async (nomCompetition, callback) => {
    if (nomCompetition){
        let competition = null;
        if (nomCompetition === "courseapied") competition = "Course à pied";
        else if (nomCompetition === "vtt") competition = "Course de VTT";
        else if (nomCompetition === "natation") competition = "Course de natation";
        else if (nomCompetition === "courseorientation") competition = "Course d'orientation";
        else if (nomCompetition === "petitecourseapied") competition = "Petite course à pied";
        else if (nomCompetition === "moyennecourseapied") competition = "Moyenne course à pied";
        else if (nomCompetition === "grandecourseapied") competition = "Grande course à pied";
        else return callback("Competition not found");
        await pool.query(signupQueries.getResultats, [competition], ((error, results)=>{
            if (error)
                return callback(error)
            else{
                return callback(null, {name: competition ,data: results.rows})
            }
        }))
    } else {
        return callback("Competition not found");
    }
}