exports.getLangues = "select l.libelle_langue as text, l.id_langue as value from langues as l;";
exports.getAge = "select a.libelle_age as text, a.id_age as value from age as a;";
exports.getSexe = "select s.libelle_sexe as text, s.id_sexe as value from sexe as s;";
exports.getPays = "select p.libelle_pays as text, p.id_pays as value from pays as p;";
exports.getTypes = "select t.id_type as value, t.etat_type as text from type_prestataire as t;";
exports.getDemandesPrestataires = "select * from prestataire inner join type_prestataire tp on tp.id_type = prestataire.id_type where etat_inscription = false;";
exports.postDemandesPrestatairesTrue = "update prestataire set etat_inscription = true where id_prestataire = $1;";
exports.postDemandesPrestatairesFalse = "delete from prestataire where id_prestataire = $1;";
exports.getResultats = "select position_classement as \"Classement\", pu.prenom_public as \"Prénom\", pu.nom_public as \"Nom\",\n" +
    "       nb_place as \"Nombre de place\", nb_km as \"Nombre de km\"\n" +
    "from public as pu\n" +
    "    inner join participe p on pu.id_public = p.id_public\n" +
    "    inner join courses c on c.id_course = p.id_course\n" +
    "where libelle_course like $1\n" +
    "order by \"Classement\", \"Nom\", \"Prénom\";";