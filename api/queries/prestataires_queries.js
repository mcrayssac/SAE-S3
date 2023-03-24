exports.getPrestataireById="SELECT * FROM prestataire WHERE id_prestataire=$1";

exports.updatePrestataire="UPDATE prestataire SET nom_prestataire=$1, email_prestataire=$2, telephone_prestataire=$3, site_web_prestataire=$4, passwd_prestataire=$5, id_type=$6 WHERE id_prestataire=$7";

exports.getOrganisateur = "select o.id_organisateur as id, o.nom_organisateur as name, o.email_organisateur as email,\n" +
    "       o.telephone_organisateur as telephone, o.passwd_organisateur as password\n" +
    "from organisateur as o where o.email_organisateur like $1 and o.passwd_organisateur like $2;";

exports.createPrestataire = "insert into prestataire values (default, $1, $2, $3, $4, $5, false, null, $7, null, null, $6, null);";

exports.deletePrestataire = "delete from prestataire where id_prestataire = $1;";

exports.getAllClubs = "SELECT nom_prestataire FROM PRESTATAIRE where id_type = 3;";

exports.getClub = "select *\
                from prestataire\
                where id_type = 3 and nom_prestataire like $1;\
                 ";

exports.getClubCommentaire = "select libelle_commentaire, nom_public, libelle_note\
                            from COMMENTAIRE as c\
                            inner join NOTE as n on n.id_note = c.id_commentaire\
                            inner join PUBLIC as p on p.id_public = c.id_public\
                            where c.id_prestataire = $1 and n.id_prestataire = $1;\
                            ";

exports.addCommentaire = "insert into COMMENTAIRE(libelle_commentaire, id_prestataire, id_public)\
                        values ($1, $2, $3)\
                        ";

exports.addNote = "insert into NOTE(libelle_note, id_prestataire, id_public)\
                values ($1, $2, $3)\
                ";

exports.aPosteCommentaire = "select * from commentaire where id_prestataire = $1 and id_public = $2;";

exports.getAllPrestataires = "SELECT nom_prestataire, id_prestataire, etat_inscription FROM PRESTATAIRE WHERE etat_inscription= true"