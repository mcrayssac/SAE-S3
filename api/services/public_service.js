const pool = require("../database/db");
const queries = require("../queries/public_queries");
const {popArray} = require("../security/methods")

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
exports.getPublicById = (_idPublic, callback) => {
    try {
        let idPublic = popArray(_idPublic)
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
exports.createPublic = (_prenom, _nom, _email, _passwd, _langue, _age, _sexe, _pays,  callback) => {
    try {
        let [prenom, nom, email, passwd, langue, age, sexe, pays] = popArray([_prenom, _nom, _email, _passwd, _langue, _age, _sexe, _pays])
        pool.query(queries.createPublic, [prenom, nom, email, passwd, parseInt(langue), parseInt(age), parseInt(sexe), parseInt(pays)], (error, results) => {
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
exports.deletePublic = (_id, callback) => {
    try {
        let id = popArray(_id)
        pool.query(queries.deleteUser, id, (error, results) => {
            if (results.rowCount === 0) {
                return callback("Public avec id = " + id + " non trouvé");
            }
            pool.query(queries.deleteUser, id, (error, results) => {
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


exports.updatePublic = (_id, _prenom, _nom, _email, _passwd, _langue, _age, _sexe, _pays, callback) => {
    try {
        let [id, prenom, nom, email, passwd, langue, age, sexe, pays] = popArray([_id, _prenom, _nom, _email, _passwd, _langue, _age, _sexe, _pays])
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
