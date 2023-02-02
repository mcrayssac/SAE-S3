exports.getAllDemos = "SELECT * FROM INITIATION WHERE id_lieu=4 AND etat_initiation=0"

// exports.getNbPlacesLeft = "SELECT COALESCE(SUM(nb_reserve_initiation), 0)  AS total_reserv, nb_places FROM INITIATION INNER JOIN A_Propos ON A_Propos.id_initiation = INITIATION.id_initiation WHERE INITIATION.id_initiation=$1 GROUP BY INITIATION.id_initiation, nb_places;"
exports.getNbPlacesLeft = "SELECT COALESCE(SUM(nb_reserve_initiation), 0) AS total_reserv FROM A_Propos WHERE id_initiation=$1;"

exports.getNbTotalPlaces = "SELECT nb_places FROM INITIATION WHERE id_initiation=$1;"

exports.addReservation = "INSERT INTO RESERVATION (id_reservation, date_periode, id_public) VALUES (default, $1, $2)"

exports.getMaxIdReservation = "SELECT MAX(id_reservation) AS max FROM RESERVATION;"

exports.addAPropos = "INSERT INTO A_Propos (id_initiation, id_reservation, nb_reserve_initiation) VALUES ($1, $2, $3)"

exports.deleteReservationsAPropos = "DELETE FROM A_Propos WHERE id_initiation=$1"

exports.deleteReservations = "DELETE FROM RESERVATION WHERE date_periode=$1"

exports.deleteDemo = "DELETE FROM INITIATION WHERE id_initiation=$1"

exports.addDemo = "INSERT INTO INITIATION VALUES(default, $5, 1, $1, $2, $3, 4, $4);"