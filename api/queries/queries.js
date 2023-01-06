const getAllPublic="SELECT * FROM public";
const getPublicById="SELECT * FROM public WHERE id_public=$1";
const getPrestataireById="SELECT * FROM prestataire WHERE id_prestataire=$1";
const getAllOrganisateur="SELECT * FROM organisateur";
const updatePublic="UPDATE public SET prenom_public=$1, nom_public=$2, email_public=$3, passwd_public=$4, id_langue=$5, id_age=$6, id_sexe=$7, id_pays=$8 WHERE id_public=$9";
const updatePrestataire="UPDATE prestataire SET nom_prestataire=$1, email_prestataire=$2, telephone_prestataire=$3, site_web_prestataire=$4, passwd_prestataire=$5, id_type=$6 WHERE id_prestataire=$7";

module.exports = {
    getAllPublic,
    getPublicById,
    getPrestataireById,
    getAllOrganisateur,
    updatePublic,
    updatePrestataire
}