exports.getLangues = "select l.libelle_langue as text, l.id_langue as value from langues as l;";
exports.getAge = "select a.libelle_age as text, a.id_age as value from age as a;";
exports.getSexe = "select s.libelle_sexe as text, s.id_sexe as value from sexe as s;";
exports.getPays = "select p.libelle_pays as text, p.id_pays as value from pays as p;";
exports.getTypes = "select t.id_type as value, t.etat_type as text from type_prestataire as t;";