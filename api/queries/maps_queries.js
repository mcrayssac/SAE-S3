const getStands = "SELECT coordonne_x, coordonne_y, rotation, PRESTATAIRE.id_stand, PRESTATAIRE.id_type, PRESTATAIRE.id_prestataire, PRESTATAIRE.nom_prestataire FROM STAND INNER JOIN PRESTATAIRE ON STAND.id_stand=PRESTATAIRE.id_stand; "
const getContraintes = "SELECT libelle_contrainte FROM CONTRAINTE;"
const getContraintesByStand = "SELECT * FROM Possede INNER JOIN CONTRAINTE ON CONTRAINTE.id_contrainte = Possede.id_contrainte"

const getAllStands = "SELECT coordonne_x, coordonne_y, rotation, PRESTATAIRE.id_stand AS id_stand_presta, STAND.id_stand, PRESTATAIRE.id_type, PRESTATAIRE.id_prestataire, PRESTATAIRE.nom_prestataire FROM STAND LEFT JOIN PRESTATAIRE ON STAND.id_stand=PRESTATAIRE.id_stand; "
const getAllPrestataires = "SELECT nom_prestataire, id_prestataire, id_stand FROM PRESTATAIRE"

module.exports = {
    getStands : getStands,
    getContraintes : getContraintes,
    getContraintesByStand : getContraintesByStand,
    getAllStands : getAllStands,
    getAllPrestataires
}