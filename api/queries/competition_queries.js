exports.getKm = "select DISTINCT nb_km as \"Kilomètres\" from courses order by nb_km;";

exports.getPlace = "select DISTINCT nb_place as \"Places\" from courses order by nb_place;";

exports.getPrix = "select DISTINCT prix as \"Prix\" from courses order by prix;";

exports.getType = "select DISTINCT libelle_sport as \"Type\" from sport order by libelle_sport;";

exports.getLieu = "select DISTINCT libelle_lieu as \"Lieu\" from lieu order by libelle_lieu;";

exports.getCompetition = "select c.id_course as \"idCourse\", c.libelle_course as \"title\", c.nb_km as \"Kilomètres\", c.nb_place as \"Places\", c.prix as \"Prix\", s.libelle_sport as \"Type\", l.libelle_lieu as \"Lieu\", url_image as \"UrlImage\"\n" +
    "from courses as c\n" +
    "inner join sport s on s.id_sport = c.id_sport\n" +
    "inner join lieu l on l.id_lieu = c.id_lieu;";

exports.deleteCompetition = "DELETE FROM courses WHERE id_course = $1"

exports.deleteParticipe = "DELETE FROM participe WHERE id_course = $1"

exports.deletePour = "DELETE FROM pour WHERE id_course = $1"

exports.getSports = "SELECT * FROM SPORT;"

exports.getIdSport = "SELECT id_sport FROM SPORT WHERE libelle_sport = $1"

exports.getIdLieu = "SELECT id_lieu FROM LIEU WHERE libelle_lieu = $1"

exports.updateCompetition = "UPDATE courses SET libelle_course=$2, nb_km=$3, nb_place=$4, prix=$5, id_sport=$6, id_lieu=$7 WHERE id_course=$1"

exports.addCompetition = "INSERT INTO courses VALUES (default, $1, $2, $3, $4,'', '', '2023-08-15 13:00:00' ,$5, $6)"