const getPublic = "select p.id_public as id, p.prenom_public as name, p.nom_public as surname, p.email_public as email,\n" +
    "       p.passwd_public as password\n" +
    "from public as p where p.email_public like $1 and p.passwd_public like $2;";

const getPrestataire ="select p.id_prestataire as id, p.nom_prestataire as name, p.email_prestataire as email,\n" +
    "       p.telephone_prestataire as telephone, p.site_web_prestataire as site, p.passwd_prestataire as password\n" +
    "from prestataire as p where p.email_prestataire like $1 and p.passwd_prestataire like $2;";

const getOrganisateur = "select o.id_organisateur as id, o.nom_organisateur as name, o.email_organisateur as email,\n" +
    "       o.telephone_organisateur as telephone, o.passwd_organisateur as password\n" +
    "from organisateur as o where o.email_organisateur like $1 and o.passwd_organisateur like $2;";

const getEmail = "select * from PUBLIC where email_public like $1;";

const createUser = "insert into PUBLIC values (default, $1, $2, $3, $4, $5, $6, $7, $8);";

/* Select User */
const selectUser = "select * from PUBLIC where id_public = $1;";
/* Note */
const selectNote = "select * from NOTE where id_public = $1;";
const deleteNote = "delete from NOTE where id_public = $1;";

/* Commentaire */
const selectCommentaire = "select * from COMMENTAIRE where id_public = $1;";
const deleteCommentaire = "delete from COMMENTAIRE where id_public = $1;";

/* Participe */
const selectParticipe = "select * from Participe where id_public = $1;";
const deleteParticipe = "delete from Participe where id_public = $1;";

/* Réservation */
const selectReservation = "select id_reservation from RESERVATION where id_public = $1;";
// Pour
const selectPour = "select * from pour where id_reservation in (select id_reservation from RESERVATION where id_public = $1);";
const deletePour = "delete from pour where id_reservation in (select id_reservation from RESERVATION where id_public = $1);";
// A_propos
const selectA_propos = "select * from a_propos where id_reservation in (select id_reservation from RESERVATION where id_public = $1);";
const deleteA_propos = "delete from a_propos where id_reservation in (select id_reservation from RESERVATION where id_public = $1);";
const deleteReservation = "delete from RESERVATION where id_public = $1;";
/* Delete User */
const deleteUser = "delete from public where id_public = $1;";

module.exports = {
    getPublic, getPrestataire, getOrganisateur, getEmail, createUser, selectUser, selectNote, deleteNote,
    selectCommentaire, deleteCommentaire, selectParticipe, deleteParticipe, selectReservation, selectPour, deletePour,
    selectA_propos, deleteA_propos, deleteReservation, deleteUser
}