const getPublic = "select p.id_public as id, p.prenom_public as Name, p.nom_public as surname, p.email_public as email,\n" +
    "       p.passwd_public as password\n" +
    "from public as p where p.email_public like $1 and p.passwd_public like $2;";
const getPrestataire ="";
const getOrganisateur = "select o.id_organisateur as id, o.nom_organisateur as Name, o.email_organisateur as email, " +
    "o.telephone_organisateur as telephone, o.passwd_organisateur as password " +
    "from organisateur as o where o.email_organisateur like $1 and o.passwd_organisateur like $2;";

module.exports = {
    getPublic,
    getPrestataire,
    getOrganisateur
}