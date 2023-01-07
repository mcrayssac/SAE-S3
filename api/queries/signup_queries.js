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
exports.getKm = "select DISTINCT nb_km as \"Kilomètres\" from courses order by nb_km;";
exports.getPlace = "select DISTINCT nb_place as \"Places\" from courses order by nb_place;";
exports.getPrix = "select DISTINCT prix as \"Prix\" from courses order by prix;";
exports.getType = "select DISTINCT libelle_sport as \"Type\" from sport order by libelle_sport;";
exports.getLieu = "select DISTINCT libelle_lieu as \"Lieu\" from lieu order by libelle_lieu;";
exports.getCompetition = "select c.libelle_course as \"title\", c.nb_km as \"Kilomètres\", c.nb_place as \"Places\", c.prix as \"Prix\", s.libelle_sport as \"Type\", l.libelle_lieu as \"Lieu\", url_image as \"UrlImage\"\n" +
    "from courses as c\n" +
    "inner join sport s on s.id_sport = c.id_sport\n" +
    "inner join lieu l on l.id_lieu = c.id_lieu;";
exports.getClicsPrestataire = "select CONCAT(EXTRACT(YEAR FROM jour), '-', EXTRACT(MONTH FROM jour), '-', EXTRACT(DAY FROM jour)) as \"x\", count(jour) as \"y\"\n" +
    "from clic where id_prestataire = $1 group by \"x\" order by \"x\";";
exports.getPrestataires = "select  libelle_caracteristique as \"Filtre\", libelle_famille as \"Famille\", nom_prestataire as \"Title\", url_image as \"UrlImage\", prestataire.id_prestataire as \"id\", site_web_prestataire as \"Site\", site_security as \"SiteSecurite\" from prestataire\n" +
    "inner join detient d on prestataire.id_prestataire = d.id_prestataire\n" +
    "inner join caracteristique c on c.id_caracteristique = d.id_caracteristique\n" +
    "inner join famille f on c.id_famille = f.id_famille\n" +
    "inner join correspond co on co.id_famille = f.id_famille\n" +
    "inner join type_prestataire tp on tp.id_type = co.id_type\n" +
    "where etat_type like $1 and nom_prestataire in (select nom_prestataire from prestataire\n" +
    "inner join type_prestataire tp on tp.id_type = prestataire.id_type\n" +
    "where etat_type like $1);";
exports.getFamille = "select libelle_caracteristique as \"Filtre\", libelle_famille as \"Famille\" from caracteristique\n" +
    "inner join famille f on caracteristique.id_famille = f.id_famille\n" +
    "inner join correspond c on c.id_famille = f.id_famille\n" +
    "inner join type_prestataire tp on tp.id_type = c.id_type\n" +
    "where etat_type like $1;";
exports.putClicsPrestataire = `insert into clic values (default, to_timestamp(${Date.now()}/1000), $1);`;