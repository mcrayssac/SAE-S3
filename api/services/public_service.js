const pool = require("../database/db");
const queries = require("../queries/queries");
const auth_queries = require("../queries/authentification_queries");

// Swagger
exports.getAllPublic = async (callback) => {
    await pool.query(queries.getAllPublic, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}

// Swagger
exports.getPublicById = (idPublic, callback) => {
    try {
        pool.query(queries.getPublicById, idPublic, (error, results) => {
            if (error) {
                console.log("Erreur service getPublicById", error);
                return callback("Erreur pour retournerle public avec l'id = " + idPublic);
            }
            return callback(null, results.rows)
        });
    } catch (e) {
        console.log(e);
        return callback("Erreur pour retournerle public avec l'id =" + idPublic);
    }
}

// Swagger
exports.createPublic = (prenom, nom, email, passwd, langue, age, sexe, pays,  callback) => {
    try {
        pool.query(auth_queries.createPublic, [prenom, nom, email, passwd, parseInt(langue), parseInt(age), parseInt(sexe), parseInt(pays)], (error, results) => {
            if (error) {
                console.log("Erreur service createPublic", error);
                return callback("Erreur lors de la création du public");
            }
            return callback(null, "Nouveau public : " + prenom + " " + nom + " créé avec succès");
        });
    } catch (e) {
        console.log(e);
        return callback("Erreur lors de la création du public");
    }
}


// Swagger
exports.deletePublic = (id, callback) => {
    try {
        pool.query(auth_queries.deleteUser, id, (error, results) => {
            if (results.rowCount === 0) {
                return callback("Public avec id = " + id + " non trouvé");
            }
            pool.query(auth_queries.deleteUser, id, (error, results) => {
                if (error) {
                    console.log("Erreur service deletePublic", error);
                    return callback("Erreur lors de la suppression du public");
                }
                return callback(null, "Public avec id = " + id + " mis à jour.")
            })
        });
    } catch (e) {
        console.log(e);
        return callback([]);
    }
}


exports.updatePublic = (id, prenom, nom, email, passwd, langue, age, sexe, pays, callback) => {
    try {
        pool.query(queries.updatePublic, [prenom, nom, email, passwd, parseInt(langue), parseInt(age), parseInt(sexe), parseInt(pays), id], (error, results) => {
            if (results.rowCount === 0) {
                return callback("Public avec id = " + id + " non trouvé");
            }
            if (error) {
                console.log("Erreur service updatePublic", error);
                return callback("Erreur update public.");
            }
            return callback(null,"Public avec id = " + id + " mis à jour.");
        });
    } catch (e) {
        console.log(e);
        return callback("Erreur update public.");
    }
}