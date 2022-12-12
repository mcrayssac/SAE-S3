COPY AGE (libelle_age) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/AGE.csv' DELIMITER AS ',';
select * from AGE;

COPY CONTRAINTE (libelle_contrainte) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/CONTRAINTE.csv' DELIMITER AS ',';
select * from CONTRAINTE;

COPY PAYS (libelle_pays) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/PAYS.csv' DELIMITER AS ',';
select * from PAYS;

COPY SEXE (libelle_sexe) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/SEXE.csv' DELIMITER AS ',';
select * from SEXE;

COPY TYPE_PRESTATAIRE (etat_type) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/TYPE_PRESTATAIRE.csv' DELIMITER AS ',';
select * from TYPE_PRESTATAIRE;

COPY LANGUES (libelle_langue) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/LANGUES.csv' DELIMITER AS ',';
select * from LANGUES;

COPY TAILLE (libelle_taille) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/TAILLE.csv' DELIMITER AS ',';
select * from TAILLE;

COPY STAND (id_taille) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/STAND.csv' DELIMITER AS ',';
select * from STAND;

COPY PUBLIC (prenom_public, nom_public, email_public, passwd_public, id_langue, id_age, id_sexe, id_pays) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/PUBLIC.csv' DELIMITER AS ',';
select * from PUBLIC;

COPY ORGANISATEUR (nom_organisateur, email_organisateur, telephone_organisateur, passwd_organisateur) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/ORGANISATEUR.csv' DELIMITER AS ',';
select * from ORGANISATEUR;

COPY LIEU (libelle_lieu) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/LIEU.csv' DELIMITER AS ',';
select * from LIEU;

COPY SPORT (libelle_sport) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/SPORT.csv' DELIMITER AS ',';
select * from SPORT;

COPY PERIODE FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/PERIODE.csv' DELIMITER AS ',';
select * from PERIODE;

COPY RESERVATION (date_periode, id_public) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/RESERVATION.csv' DELIMITER AS ',';
select * from RESERVATION;

COPY CARACTERISTIQUE (libelle_caracteristique, id_type) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/CARACTERISTIQUE.csv' DELIMITER AS ',';
select * from CARACTERISTIQUE;

COPY PRESTATAIRE (nom_prestataire, email_prestataire, site_web_prestataire, telephone_prestataire, passwd_prestataire, etat_inscription, id_stand, id_type) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/PRESTATAIRE.csv' DELIMITER AS ',';
select * from PRESTATAIRE;

COPY COURSES (libelle_course, nb_km, nb_place, prix, date_periode, id_sport, id_lieu) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/COURSES.csv' DELIMITER AS ',';
select * from COURSES;

COPY INITIATION (libelle_initiation, etat_initiation, date_periode, id_lieu, id_prestataire) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/INITIATION.csv' DELIMITER AS ',';
select * from INITIATION;

COPY NOTE (libelle_note, id_prestataire, id_public) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/NOTE.csv' DELIMITER AS ',';
select * from NOTE;

COPY COMMENTAIRE (libelle_commentaire, id_prestataire, id_public) FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/COMMENTAIRE.csv' DELIMITER AS ',';
select * from COMMENTAIRE;

COPY Emet FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/Emet.csv' DELIMITER AS ',';
select * from Emet;

COPY Possede FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/Possede.csv' DELIMITER AS ',';
select * from Possede;

COPY Participe FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/Participe.csv' DELIMITER AS ',';
select * from Participe;

COPY A_Propos FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/A_Propos.csv' DELIMITER AS ',';
select * from A_Propos;

COPY Pour FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/Pour.csv' DELIMITER AS ',';
select * from Pour;

COPY Detient FROM '/home/user/Documents/BUT/2e_annee/semestre_1/SAUV_SAE-S3/Detient.csv' DELIMITER AS ',';
select * from Detient;
