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

module.exports = {
    getPublic, getPrestataire, getOrganisateur, getEmail, createUser
}