const getStands = "SELECT coordonne_x, coordonne_y, rotation,  PRESTATAIRE.id_type, PRESTATAIRE.id_prestataire FROM STAND INNER JOIN PRESTATAIRE ON STAND.id_stand=PRESTATAIRE.id_stand; "


module.exports = {
    getStands : getStands
}