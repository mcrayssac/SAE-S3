const getStands = "SELECT coordonne_x, coordonne_y, rotation, PRESTATAIRE.id_stand, PRESTATAIRE.id_type, PRESTATAIRE.id_prestataire, PRESTATAIRE.nom_prestataire FROM STAND INNER JOIN PRESTATAIRE ON STAND.id_stand=PRESTATAIRE.id_stand; "
const getContraintes = "SELECT libelle_contrainte FROM CONTRAINTE;"
const getContraintesByStand = "SELECT * FROM Possede INNER JOIN CONTRAINTE ON CONTRAINTE.id_contrainte = Possede.id_contrainte"

const getAllStands = "SELECT coordonne_x, coordonne_y, rotation, PRESTATAIRE.id_stand AS id_stand_presta, STAND.id_stand, PRESTATAIRE.id_type, PRESTATAIRE.id_prestataire, PRESTATAIRE.nom_prestataire FROM STAND LEFT JOIN PRESTATAIRE ON STAND.id_stand=PRESTATAIRE.id_stand; "
const getAllPrestataires = "SELECT nom_prestataire, id_prestataire, id_stand FROM PRESTATAIRE"

const getTypeCaracteristiquesPresta = "SELECT libelle_caracteristique, etat_type, PRESTATAIRE.id_prestataire FROM PRESTATAIRE INNER JOIN Detient ON Detient.id_prestataire= PRESTATAIRE.id_prestataire INNER JOIN TYPE_PRESTATAIRE ON TYPE_PRESTATAIRE.id_type= PRESTATAIRE.id_type INNER JOIN CARACTERISTIQUE ON CARACTERISTIQUE.id_caracteristique= Detient.id_caracteristique;"

// const getClassementCourse = "select c.libelle_course, pa.position_classement, p.prenom_public, p.nom_public\
//                             from Participe as pa\
//                             inner join COURSES as c on c.id_course = pa.id_course\
//                             inner join PUBLIC as p on p.id_public = pa.id_public\
//                             where c.id_course = $1\
//                             order by pa.position_classement\
//                             ;"

module.exports = {
    getStands : getStands,
    getContraintes : getContraintes,
    getContraintesByStand : getContraintesByStand,
    getAllStands : getAllStands,
    getAllPrestataires,
    getTypeCaracteristiquesPresta : getTypeCaracteristiquesPresta,
    // getClassementCourse: getClassementCourse
}