exports.getResultats = "select position_classement as \"Classement\", pu.prenom_public as \"Prénom\", pu.nom_public as \"Nom\",\n" +
    "       nb_place as \"Nombre de place\", nb_km as \"Nombre de km\"\n" +
    "from public as pu\n" +
    "    inner join participe p on pu.id_public = p.id_public\n" +
    "    inner join courses c on c.id_course = p.id_course\n" +
    "where libelle_course like $1\n" +
    "order by \"Classement\", \"Nom\", \"Prénom\";";

