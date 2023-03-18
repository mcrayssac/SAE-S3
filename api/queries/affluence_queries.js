exports.getAffluence="SELECT libelle_affluence FROM affluence INNER JOIN prestataire ON prestataire.id_affluence = affluence.id_affluence WHERE id_prestataire=$1";

exports.setAffluence = "UPDATE PRESTATAIRE SET id_affluence = $2 WHERE id_prestataire = $1"