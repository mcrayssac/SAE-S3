SET CLIENT_ENCODING TO 'UTF8';
\COPY AGE (libelle_age) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/AGE.csv' DELIMITER AS ',';
select * from AGE;

\COPY CONTRAINTE (libelle_contrainte) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/CONTRAINTE.csv' DELIMITER AS ',';
select * from CONTRAINTE;

\COPY PAYS (libelle_pays) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/PAYS.csv' DELIMITER AS ',';
select * from PAYS;

\COPY SEXE (libelle_sexe) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/SEXE.csv' DELIMITER AS ',';
select * from SEXE;

\COPY TYPE_PRESTATAIRE (etat_type) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/TYPE_PRESTATAIRE.csv' DELIMITER AS ',';
select * from TYPE_PRESTATAIRE;

\COPY LANGUES (libelle_langue) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/LANGUES.csv' DELIMITER AS ',';
select * from LANGUES;

\COPY TAILLE (libelle_taille) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/TAILLE.csv' DELIMITER AS ',';
select * from TAILLE;

\COPY FAMILLE (libelle_famille) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/FAMILLE.csv' DELIMITER AS ',';
select * from FAMILLE;

\COPY STAND (id_stand, coordonne_x, coordonne_y, rotation, id_taille) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/STAND.csv' DELIMITER AS ',';
select * from STAND;

\COPY PUBLIC (prenom_public, nom_public, email_public, passwd_public, id_langue, id_age, id_sexe, id_pays) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/PUBLIC.csv' DELIMITER AS ',';
select * from PUBLIC;

\COPY ORGANISATEUR (nom_organisateur, email_organisateur, telephone_organisateur, passwd_organisateur) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/ORGANISATEUR.csv' DELIMITER AS ',';
select * from ORGANISATEUR;

\COPY LIEU (libelle_lieu) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/LIEU.csv' DELIMITER AS ',';
select * from LIEU;

\COPY SPORT (libelle_sport) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/SPORT.csv' DELIMITER AS ',';
select * from SPORT;

\COPY PERIODE FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/PERIODE.csv' DELIMITER AS ',';
select * from PERIODE;

\COPY RESERVATION (date_periode, id_public) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/RESERVATION.csv' DELIMITER AS ',';
select * from RESERVATION;

\COPY CARACTERISTIQUE (libelle_caracteristique, id_famille) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/CARACTERISTIQUE.csv' DELIMITER AS ',';
select * from CARACTERISTIQUE;

\COPY AFFLUENCE (libelle_affluence) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/AFFLUENCE.csv' DELIMITER AS ',';
select * from AFFLUENCE;

DROP TABLE tmp_table;
-- empty temp table with identical structure
CREATE TEMP TABLE tmp_table AS TABLE PRESTATAIRE LIMIT 0;

CREATE TEMP SEQUENCE tmp_presta_id_seq
    OWNED BY tmp_table.id_prestataire;

ALTER TABLE tmp_table
    ALTER COLUMN id_prestataire SET DEFAULT nextval('tmp_presta_id_seq');

\COPY tmp_table (nom_prestataire, email_prestataire, site_web_prestataire, telephone_prestataire, passwd_prestataire, etat_inscription, id_stand, id_type, text_gauche, text_droite, url_image, image_body, id_affluence) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/PRESTATAIRE.csv' DELIMITER AS ',';

INSERT INTO PRESTATAIRE  -- identical number and names of columns guaranteed
SELECT id_prestataire, nom_prestataire, email_prestataire, telephone_prestataire, site_web_prestataire, passwd_prestataire, etat_inscription, (NULLIF(id_stand,0))::int, id_type, text_gauche, text_droite, url_image, image_body, id_affluence  -- list all columns in order here
FROM tmp_table;

ALTER SEQUENCE prestataire_id_prestataire_seq RESTART WITH 22;

select * from PRESTATAIRE;

\COPY COURSES (libelle_course, nb_km, nb_place, prix, trace, url_image, date_periode, id_sport, id_lieu) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/COURSES.csv' DELIMITER AS '*';
select * from COURSES;

\COPY INITIATION (libelle_initiation, etat_initiation, date_periode, fin_periode, nb_places, id_lieu, id_prestataire) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/INITIATION.csv' DELIMITER AS ',';
select * from INITIATION;

\COPY NOTE (libelle_note, id_prestataire, id_public) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/NOTE.csv' DELIMITER AS ',';
select * from NOTE;

\COPY CLIC (jour, id_prestataire) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/CLIC.csv' DELIMITER AS ',';
select * from CLIC;

\COPY COMMENTAIRE (libelle_commentaire, id_prestataire, id_public) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/COMMENTAIRE.csv' DELIMITER AS ',';
select * from COMMENTAIRE;

\COPY Emet FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/Emet.csv' DELIMITER AS ',';
select * from Emet;

\COPY Possede FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/Possede.csv' DELIMITER AS ',';
select * from Possede;

\COPY Participe FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/Participe.csv' DELIMITER AS ',';
select * from Participe;

\COPY A_Propos FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/A_Propos.csv' DELIMITER AS ',';
select * from A_Propos;

\COPY Pour FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/Pour.csv' DELIMITER AS ',';
select * from Pour;

\COPY Detient (id_prestataire, id_caracteristique) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/Detient.csv' DELIMITER AS ',';
select * from Detient;

\COPY Correspond (id_type, id_famille) FROM '/home/mbenoit/Documents/S4/SAE/SAE-S3/BDD/Correspond.csv' DELIMITER AS ',';
select * from Correspond;
