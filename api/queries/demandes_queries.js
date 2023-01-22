exports.getDemandesPrestataires = "select * from prestataire inner join type_prestataire tp on tp.id_type = prestataire.id_type where etat_inscription = false;";

exports.postDemandesPrestatairesTrue = "update prestataire set etat_inscription = true where id_prestataire = $1;";

exports.postDemandesPrestatairesFalse = "delete from prestataire where id_prestataire = $1;";