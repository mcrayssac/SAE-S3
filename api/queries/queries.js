const getAllPublic="SELECT * FROM public";
const getPublicById="SELECT * FROM public WHERE id_public=$1";
const getPrestataireById="SELECT * FROM prestataire WHERE id_prestataire=$1";
const getAllOrganisateur="SELECT * FROM organisateur";
const updatePublic="UPDATE public SET prenom_public=$1, nom_public=$2, email_public=$3, passwd_public=$4, id_langue=$5, id_age=$6, id_sexe=$7, id_pays=$8 WHERE id_public=$9";
const updatePrestataire="UPDATE prestataire SET nom_prestataire=$1, email_prestataire=$2, telephone_prestataire=$3, site_web_prestataire=$4, passwd_prestataire=$5, id_type=$6 WHERE id_prestataire=$7";
const getAllDemos = "SELECT * FROM INITIATION WHERE id_lieu=4 AND etat_initiation=0"
const getNbPlacesLeft = "SELECT SUM(nb_reserve_initiation) AS total_reserv, nb_places FROM INITIATION INNER JOIN A_Propos ON A_Propos.id_initiation = INITIATION.id_initiation WHERE INITIATION.id_initiation=$1 GROUP BY INITIATION.id_initiation, nb_places;"
const addReservation = "INSERT INTO RESERVATION (id_reservation, date_periode, id_public) VALUES (default, $1, $2)"
const addAPropos = "INSERT INTO A_Propos (id_initiation, id_reservation, nb_reserve_initiation) VALUES ($1, $2, $3)"
const getMaxIdReservation = "SELECT MAX(id_reservation) AS max FROM RESERVATION;"
const deleteReservationsAPropos = "DELETE FROM A_Propos WHERE id_initiation=$1"
const deleteReservations = "DELETE FROM RESERVATION WHERE date_periode=$1"
const deleteDemo = "DELETE FROM INITIATION WHERE id_initiation=$1"
const addDemo = "INSERT INTO INITIATION VALUES(default, $5, 1, $1, $2, $3, 4, $4);"

module.exports = {
    getAllPublic,
    getPublicById,
    getPrestataireById,
    getAllOrganisateur,
    updatePublic,
    updatePrestataire,
    getAllDemos,
    getNbPlacesLeft,
    addReservation,
    addAPropos,
    getMaxIdReservation,
    deleteReservationsAPropos,
    deleteReservations,
    deleteDemo,
    addDemo
}