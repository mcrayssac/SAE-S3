\copy AGE (libelle_age) FROM 'C:\Users\mlcra\SAE-S3\BDD\AGE.csv' DELIMITER AS ',';
select * from AGE;

\copy CONTRAINTE (libelle_contrainte) FROM 'C:\Users\mlcra\SAE-S3\BDD\CONTRAINTE.csv' DELIMITER AS ',';
select * from CONTRAINTE;

\copy PAYS (libelle_pays) FROM 'C:\Users\mlcra\SAE-S3\BDD\PAYS.csv' DELIMITER AS ',';
select * from PAYS;

\copy SEXE (libelle_sexe) FROM 'C:\Users\mlcra\SAE-S3\BDD\SEXE.csv' DELIMITER AS ',';
select * from SEXE;

\copy TYPE_PRESTATAIRE (etat_type) FROM 'C:\Users\mlcra\SAE-S3\BDD\TYPE_PRESTATAIRE.csv' DELIMITER AS ',';
select * from TYPE_PRESTATAIRE;

\copy LANGUES (libelle_langue) FROM 'C:\Users\mlcra\SAE-S3\BDD\LANGUES.csv' DELIMITER AS ',';
select * from LANGUES;

\copy TAILLE (libelle_taille) FROM 'C:\Users\mlcra\SAE-S3\BDD\TAILLE.csv' DELIMITER AS ',';
select * from TAILLE;

\copy STAND (id_taille) FROM 'C:\Users\mlcra\SAE-S3\BDD\STAND.csv' DELIMITER AS ',';
select * from STAND;

\copy PUBLIC (prenom_public, nom_public, email_public, passwd_public, id_langue, id_age, id_sexe, id_pays) FROM 'C:\Users\mlcra\SAE-S3\BDD\PUBLIC.csv' DELIMITER AS ',';
select * from PUBLIC;

\copy ORGANISATEUR (nom_organisateur, email_organisateur, telephone_organisateur, passwd_organisateur) FROM 'C:\Users\mlcra\SAE-S3\BDD\ORGANISATEUR.csv' DELIMITER AS ',';
select * from ORGANISATEUR;

\copy LIEU (libelle_lieu) FROM 'C:\Users\mlcra\SAE-S3\BDD\LIEU.csv' DELIMITER AS ',';
select * from LIEU;

\copy SPORT (libelle_sport) FROM 'C:\Users\mlcra\SAE-S3\BDD\SPORT.csv' DELIMITER AS ',';
select * from SPORT;

\copy PERIODE FROM 'C:\Users\mlcra\SAE-S3\BDD\PERIODE.csv' DELIMITER AS ',';
select * from PERIODE;

\copy RESERVATION (date_periode, id_public) FROM 'C:\Users\mlcra\SAE-S3\BDD\RESERVATION.csv' DELIMITER AS ',';
select * from RESERVATION;

\copy CARACTERISTIQUE (libelle_caracteristique, id_type) FROM 'C:\Users\mlcra\SAE-S3\BDD\CARACTERISTIQUE.csv' DELIMITER AS ',';
select * from CARACTERISTIQUE;

\copy PRESTATAIRE (nom_prestataire, email_prestataire, site_web_prestataire, telephone_prestataire, passwd_prestataire, id_stand, id_type) FROM 'C:\Users\mlcra\SAE-S3\BDD\PRESTATAIRE.csv' DELIMITER AS ',';
select * from PRESTATAIRE;

\copy COURSES (libelle_course, nb_km, nb_place, prix, date_periode, id_sport, id_lieu) FROM 'C:\Users\mlcra\SAE-S3\BDD\COURSES.csv' DELIMITER AS ',';
select * from COURSES;

\copy INITIATION (libelle_initiation, etat_initiation, date_periode, id_lieu, id_prestataire) FROM 'C:\Users\mlcra\SAE-S3\BDD\INITIATION.csv' DELIMITER AS ',';
select * from INITIATION;

\copy NOTE (libelle_note, id_prestataire, id_public) FROM 'C:\Users\mlcra\SAE-S3\BDD\NOTE.csv' DELIMITER AS ',';
select * from NOTE;

\copy COMMENTAIRE (libelle_commentaire, id_prestataire, id_public) FROM 'C:\Users\mlcra\SAE-S3\BDD\COMMENTAIRE.csv' DELIMITER AS ',';
select * from COMMENTAIRE;

\copy Emet FROM 'C:\Users\mlcra\SAE-S3\BDD\Emet.csv' DELIMITER AS ',';
select * from Emet;

\copy Possede FROM 'C:\Users\mlcra\SAE-S3\BDD\Possede.csv' DELIMITER AS ',';
select * from Possede;

\copy Participe FROM 'C:\Users\mlcra\SAE-S3\BDD\Participe.csv' DELIMITER AS ',';
select * from Participe;

\copy A_Propos FROM 'C:\Users\mlcra\SAE-S3\BDD\A_Propos.csv' DELIMITER AS ',';
select * from A_Propos;

\copy Pour FROM 'C:\Users\mlcra\SAE-S3\BDD\Pour.csv' DELIMITER AS ',';
select * from Pour;

\copy Detient FROM 'C:\Users\mlcra\SAE-S3\BDD\Detient.csv' DELIMITER AS ',';
select * from Detient;
