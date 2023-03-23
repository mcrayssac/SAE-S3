exports.getDemandesPrestataires = "select * from prestataire inner join type_prestataire tp on tp.id_type = prestataire.id_type where etat_inscription = false;";

exports.postDemandesPrestatairesTrue = "update prestataire set etat_inscription = true where id_prestataire = $1;";

exports.postDemandesPrestatairesFalse = "delete from prestataire where id_prestataire = $1;";

exports.getDemandesActivites = "select i.id_prestataire, nom_prestataire, id_initiation, libelle_initiation, nb_places, date_periode, fin_periode, libelle_lieu from prestataire inner join initiation i on i.id_prestataire = prestataire.id_prestataire inner join lieu on lieu.id_lieu = i.id_lieu where etat_initiation = 1;";

exports.postDemandesActivitesTrue = "update initiation set etat_initiation = 0 where id_prestataire = $1 and id_initiation = $2;";

exports.postDemandesActivitesFalse = "delete from initiation where id_prestataire = $1 and id_initiation = $2;";