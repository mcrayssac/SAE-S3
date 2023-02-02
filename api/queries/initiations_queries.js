exports.getAllInitiations = "SELECT * FROM INITIATION WHERE id_lieu=3 AND etat_initiation=0 AND id_prestataire=$1"

exports.addInitiation = "INSERT INTO INITIATION VALUES(default, $5, 1, $1, $2, $3, 3, $4);"