\COPY AGE (libelle_age) FROM 'C:\Users\mlcra\SAE-S3\BDD\AGE.csv' DELIMITER AS ',';
select * from AGE;

\COPY CONTRAINTE (libelle_contrainte) FROM 'C:\Users\mlcra\SAE-S3\BDD\CONTRAINTE.csv' DELIMITER AS ',';
select * from CONTRAINTE;

\COPY PAYS (libelle_pays) FROM 'C:\Users\mlcra\SAE-S3\BDD\PAYS.csv' DELIMITER AS ',';
select * from PAYS;

\COPY SEXE (libelle_sexe) FROM 'C:\Users\mlcra\SAE-S3\BDD\SEXE.csv' DELIMITER AS ',';
select * from SEXE;

\COPY TYPE_PRESTATAIRE (etat_type) FROM 'C:\Users\mlcra\SAE-S3\BDD\TYPE_PRESTATAIRE.csv' DELIMITER AS ',';
select * from TYPE_PRESTATAIRE;

\COPY LANGUES (libelle_langue) FROM 'C:\Users\mlcra\SAE-S3\BDD\LANGUES.csv' DELIMITER AS ',';
select * from LANGUES;

\COPY TAILLE (libelle_taille) FROM 'C:\Users\mlcra\SAE-S3\BDD\TAILLE.csv' DELIMITER AS ',';
select * from TAILLE;

\COPY STAND (id_stand, coordonne_x, coordonne_y, rotation, id_taille) FROM 'C:\Users\mlcra\SAE-S3\BDD\STAND.csv' DELIMITER AS ',';
select * from STAND;

\COPY PUBLIC (prenom_public, nom_public, email_public, passwd_public, id_langue, id_age, id_sexe, id_pays) FROM 'C:\Users\mlcra\SAE-S3\BDD\PUBLIC.csv' DELIMITER AS ',';
select * from PUBLIC;

\COPY ORGANISATEUR (nom_organisateur, email_organisateur, telephone_organisateur, passwd_organisateur) FROM 'C:\Users\mlcra\SAE-S3\BDD\ORGANISATEUR.csv' DELIMITER AS ',';
select * from ORGANISATEUR;

\COPY LIEU (libelle_lieu) FROM 'C:\Users\mlcra\SAE-S3\BDD\LIEU.csv' DELIMITER AS ',';
select * from LIEU;

\COPY SPORT (libelle_sport) FROM 'C:\Users\mlcra\SAE-S3\BDD\SPORT.csv' DELIMITER AS ',';
select * from SPORT;

\COPY PERIODE FROM 'C:\Users\mlcra\SAE-S3\BDD\PERIODE.csv' DELIMITER AS ',';
select * from PERIODE;

\COPY RESERVATION (date_periode, id_public) FROM 'C:\Users\mlcra\SAE-S3\BDD\RESERVATION.csv' DELIMITER AS ',';
select * from RESERVATION;

\COPY CARACTERISTIQUE (libelle_caracteristique, id_type) FROM 'C:\Users\mlcra\SAE-S3\BDD\CARACTERISTIQUE.csv' DELIMITER AS ',';
select * from CARACTERISTIQUE;

\COPY PRESTATAIRE (nom_prestataire, email_prestataire, site_web_prestataire, telephone_prestataire, passwd_prestataire, etat_inscription, id_stand, id_type) FROM 'C:\Users\mlcra\SAE-S3\BDD\PRESTATAIRE.csv' DELIMITER AS ',';
select * from PRESTATAIRE;

\COPY COURSES (libelle_course, nb_km, nb_place, prix, date_periode, id_sport, id_lieu) FROM 'C:\Users\mlcra\SAE-S3\BDD\COURSES.csv' DELIMITER AS ',';
select * from COURSES;

\COPY INITIATION (libelle_initiation, etat_initiation, date_periode, id_lieu, id_prestataire) FROM 'C:\Users\mlcra\SAE-S3\BDD\INITIATION.csv' DELIMITER AS ',';
select * from INITIATION;

\COPY NOTE (libelle_note, id_prestataire, id_public) FROM 'C:\Users\mlcra\SAE-S3\BDD\NOTE.csv' DELIMITER AS ',';
select * from NOTE;

\COPY COMMENTAIRE (libelle_commentaire, id_prestataire, id_public) FROM 'C:\Users\mlcra\SAE-S3\BDD\COMMENTAIRE.csv' DELIMITER AS ',';
select * from COMMENTAIRE;

\COPY Emet FROM 'C:\Users\mlcra\SAE-S3\BDD\Emet.csv' DELIMITER AS ',';
select * from Emet;

\COPY Possede FROM 'C:\Users\mlcra\SAE-S3\BDD\Possede.csv' DELIMITER AS ',';
select * from Possede;

\COPY Participe FROM 'C:\Users\mlcra\SAE-S3\BDD\Participe.csv' DELIMITER AS ',';
select * from Participe;

\COPY A_Propos FROM 'C:\Users\mlcra\SAE-S3\BDD\A_Propos.csv' DELIMITER AS ',';
select * from A_Propos;

\COPY Pour FROM 'C:\Users\mlcra\SAE-S3\BDD\Pour.csv' DELIMITER AS ',';
select * from Pour;

\COPY Detient FROM 'C:\Users\mlcra\SAE-S3\BDD\Detient.csv' DELIMITER AS ',';
select * from Detient;


select nom_prestataire, coordonne_x, coordonne_y, rotation
from PRESTATAIRE
inner join STAND as s on s.id_stand = PRESTATAIRE.id_stand
;
