exports.getAllPublic="SELECT * FROM public";

exports.getPublicById="SELECT * FROM public WHERE id_public=$1";

exports.updatePublic="UPDATE public SET prenom_public=$1, nom_public=$2, email_public=$3, passwd_public=$4, id_langue=$5, id_age=$6, id_sexe=$7, id_pays=$8 WHERE id_public=$9";

exports.createPublic = "insert into PUBLIC values (default, $1, $2, $3, $4, $5, $6, $7, $8);";

exports.deleteUser = "delete from public where id_public = $1;";