const getStands = "SELECT coordonne_x, coordonne_y, rotation, PRESTATAIRE.id_stand, PRESTATAIRE.id_type, PRESTATAIRE.id_prestataire, PRESTATAIRE.nom_prestataire FROM STAND INNER JOIN PRESTATAIRE ON STAND.id_stand=PRESTATAIRE.id_stand; "
const getContraintes = "SELECT id_contrainte, libelle_contrainte FROM CONTRAINTE;"
const getContraintesByStand = "SELECT * FROM Possede INNER JOIN CONTRAINTE ON CONTRAINTE.id_contrainte = Possede.id_contrainte"

module.exports = {
    getStands : getStands,
    getContraintes : getContraintes,
    getContraintesByStand : getContraintesByStand
}