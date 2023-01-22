exports.getFamille = "select libelle_caracteristique as \"Filtre\", libelle_famille as \"Famille\" from caracteristique\n" +
    "inner join famille f on caracteristique.id_famille = f.id_famille\n" +
    "inner join correspond c on c.id_famille = f.id_famille\n" +
    "inner join type_prestataire tp on tp.id_type = c.id_type\n" +
    "where etat_type like $1;";

exports.getPrestataires = "select  libelle_caracteristique as \"Filtre\", libelle_famille as \"Famille\", nom_prestataire as \"Title\", url_image as \"UrlImage\", prestataire.id_prestataire as \"id\", site_web_prestataire as \"Site\" from prestataire\n" +
    "inner join detient d on prestataire.id_prestataire = d.id_prestataire\n" +
    "inner join caracteristique c on c.id_caracteristique = d.id_caracteristique\n" +
    "inner join famille f on c.id_famille = f.id_famille\n" +
    "inner join correspond co on co.id_famille = f.id_famille\n" +
    "inner join type_prestataire tp on tp.id_type = co.id_type\n" +
    "where etat_type like $1 and prestataire.etat_inscription = true and nom_prestataire in (select nom_prestataire from prestataire\n" +
    "inner join type_prestataire tp on tp.id_type = prestataire.id_type\n" +
    "where etat_type like $1);";