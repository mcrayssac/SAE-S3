const getPublic = "select p.id_public as id, p.prenom_public as name, p.nom_public as surname, p.email_public as email,\n" +
    "       p.passwd_public as password\n" +
    "from public as p where p.email_public like $1 and p.passwd_public like $2;";

const getPrestataire ="select p.id_prestataire as id, p.nom_prestataire as name, p.email_prestataire as email,\n" +
    "       p.telephone_prestataire as telephone, p.site_web_prestataire as site, p.passwd_prestataire as password," +
    "       p.etat_inscription as etat\n" +
    "from prestataire as p where p.email_prestataire like $1 and p.passwd_prestataire like $2;";

const getOrganisateur = "select o.id_organisateur as id, o.nom_organisateur as name, o.email_organisateur as email,\n" +
    "       o.telephone_organisateur as telephone, o.passwd_organisateur as password\n" +
    "from organisateur as o where o.email_organisateur like $1 and o.passwd_organisateur like $2;";

const getEmailPublic = "select * from PUBLIC where email_public like $1;";
const getEmailPrestataire = "select * from prestataire where prestataire.email_prestataire like $1;";

const createPublic = "insert into PUBLIC values (default, $1, $2, $3, $4, $5, $6, $7, $8);";
const createPrestataire = "insert into prestataire values (default, $1, $2, $3, $4, $5, false, null, $7, null, null, $6, null);";
const getIdPrestataire = "select id_prestataire from prestataire where email_prestataire like $1;";
const insertDetient = "insert into detient (id_prestataire, id_caracteristique)  values ($1, $2);";

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
const deletePrestataire = "delete from prestataire where id_prestataire = $1;";

module.exports = {
    getPublic, getPrestataire, getOrganisateur, getEmailPublic, getEmailPrestataire, createPublic, createPrestataire,
    selectUser, selectNote, deleteNote, selectCommentaire, deleteCommentaire, selectParticipe, deleteParticipe,
    selectReservation, selectPour, deletePour, selectA_propos, deleteA_propos, deleteReservation, deleteUser,
    deletePrestataire, getIdPrestataire, insertDetient
}