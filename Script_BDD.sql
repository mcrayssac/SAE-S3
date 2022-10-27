DROP TABLE IF EXISTS Detient;
DROP TABLE IF EXISTS Associe;
DROP TABLE IF EXISTS Pour;
DROP TABLE IF EXISTS Donne;
DROP TABLE IF EXISTS A_Propos;
DROP TABLE IF EXISTS Depends;
DROP TABLE IF EXISTS Fait;
DROP TABLE IF EXISTS Participe;
DROP TABLE IF EXISTS Renseigne;
DROP TABLE IF EXISTS Possede;
DROP TABLE IF EXISTS Collecte;
DROP TABLE IF EXISTS Emet;
DROP TABLE IF EXISTS COMMENTAIRE; /**/
DROP TABLE IF EXISTS PHOTO;
DROP TABLE IF EXISTS CONTENU; /* ====== pb futur a regler ====== */
DROP TABLE IF EXISTS BIENS; /**/
DROP TABLE IF EXISTS INITIATION;
DROP TABLE IF EXISTS COURSES;
DROP TABLE IF EXISTS NOTE; /**/
DROP TABLE IF EXISTS ATTRIBUE;
DROP TABLE IF EXISTS RESERVATION;
DROP TABLE IF EXISTS CARACTERISTIQUE;
DROP TABLE IF EXISTS PERIODE;
DROP TABLE IF EXISTS LIEU;
DROP TABLE IF EXISTS SPORT;
DROP TABLE IF EXISTS PRESTATAIRE; /**/
DROP TABLE IF EXISTS STAND;
DROP TABLE IF EXISTS TYPE_PRESTATAIRE;
DROP TABLE IF EXISTS CONTRAINTE;
DROP TABLE IF EXISTS ORGANISATEUR; /**/
DROP TABLE IF EXISTS PUBLIC; /**/
DROP TABLE IF EXISTS LANGUES;
DROP TABLE IF EXISTS DONNEES;

CREATE TABLE IF NOT EXISTS CONTRAINTE (
   id_contrainte INT,
   libelle_contrainte VARCHAR(100),
   PRIMARY KEY(id_contrainte)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS DONNEES (
   id_donnees INT,
   libelle_donnees VARCHAR(50),
   PRIMARY KEY(id_donnees)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS TYPE_PRESTATAIRE (
   id_type INT,
   etat_type VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_type)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS LANGUES (
   id_langue INT UNSIGNED AUTO_INCREMENT NOT NULL,
   libelle_langue VARCHAR(60),
   PRIMARY KEY(id_langue)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS STAND (
   id_stand INT,
   taille_stand DECIMAL(5,2),
   PRIMARY KEY(id_stand)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS PUBLIC (
   id_public INT UNSIGNED AUTO_INCREMENT NOT NULL,
   username_public VARCHAR(50),
   passwd_public VARCHAR(50),
   id_langue INT UNSIGNED NOT NULL,
   PRIMARY KEY(id_public),
   FOREIGN KEY(id_langue) REFERENCES LANGUES(id_langue)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS ORGANISATEUR (
   id_organisateur INT,
   nom_organisateur VARCHAR(100),
   email_organisateur VARCHAR(100),
   telephone_organisateur VARCHAR(10),
   username_organisateur VARCHAR(50),
   passwd_organisateur VARCHAR(50),
   PRIMARY KEY(id_organisateur)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS LIEU (
   id_lieu INT,
   libelle_lieu VARCHAR(50),
   PRIMARY KEY(id_lieu)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS SPORT (
   id_sport INT,
   libelle_sport VARCHAR(100),
   PRIMARY KEY(id_sport)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS PERIODE (
   date_periode DATETIME,
   PRIMARY KEY(date_periode)
) CHARACTER SET utf8;

CREATE TABLE RESERVATION (
   id_reservation INT,
   date_heure_reservation DATETIME,
   id_public INT UNSIGNED NOT NULL,
   PRIMARY KEY(id_reservation),
   FOREIGN KEY(id_public) REFERENCES PUBLIC(id_public)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS ATTRIBUE (
   id_attribut INT,
   libelle_attribut VARCHAR(50),
   id_donnees INT NOT NULL,
   PRIMARY KEY(id_attribut),
   FOREIGN KEY(id_donnees) REFERENCES DONNEES(id_donnees)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS CARACTERISTIQUE (
   id_caracteristique INT,
   libelle_caracteristique VARCHAR(50),
   PRIMARY KEY(id_caracteristique)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS PRESTATAIRE (
   id_prestataire INT,
   nom_prestataire VARCHAR(100),
   email_prestataire VARCHAR(100),
   telephone_prestataire VARCHAR(10),
   username_prestataire VARCHAR(50),
   passwd_prestataire VARCHAR(50),
   id_type INT NOT NULL,
   id_stand INT NOT NULL,
   id_organisateur INT NOT NULL,
   PRIMARY KEY(id_prestataire),
   FOREIGN KEY(id_type) REFERENCES TYPE_PRESTATAIRE(id_type),
   FOREIGN KEY(id_stand) REFERENCES STAND(id_stand)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS COURSES (
   id_course INT,
   libelle_course VARCHAR(100),
   nb_km INT,
   nb_place INT,
   prix DECIMAL(4,2),
   date_periode DATETIME NOT NULL,
   id_sport INT NOT NULL,
   id_lieu INT NOT NULL,
   PRIMARY KEY(id_course),
   FOREIGN KEY(date_periode) REFERENCES PERIODE(date_periode),
   FOREIGN KEY(id_sport) REFERENCES SPORT(id_sport),
   FOREIGN KEY(id_lieu) REFERENCES LIEU(id_lieu)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS INITIATION (
   id_initiation INT,
   libelle_initiation VARCHAR(1000),
   date_periode DATETIME NOT NULL,
   id_prestataire INT NOT NULL,
   PRIMARY KEY(id_initiation),
   FOREIGN KEY(date_periode) REFERENCES PERIODE(date_periode),
   FOREIGN KEY(id_prestataire) REFERENCES PRESTATAIRE(id_prestataire)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS BIENS (
   id_bien INT,
   libelle_bien VARCHAR(100),
   montant_bien DECIMAL(6,2),
   id_prestataire INT NOT NULL,
   PRIMARY KEY(id_bien),
   FOREIGN KEY(id_prestataire) REFERENCES PRESTATAIRE(id_prestataire)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS CONTENU (
   id_organisateur INT,
   id_prestataire INT,
   id_contenu INT,
   libelle_contenu VARCHAR(50),
   PRIMARY KEY(id_organisateur, id_prestataire, id_contenu),
   FOREIGN KEY(id_organisateur) REFERENCES ORGANISATEUR(id_organisateur),
   FOREIGN KEY(id_prestataire) REFERENCES PRESTATAIRE(id_prestataire)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS PHOTO (
   id_organisateur INT,
   id_prestataire INT,
   id_photo INT,
   lien_photo VARCHAR(400),
   PRIMARY KEY(id_organisateur, id_prestataire, id_photo),
   FOREIGN KEY(id_organisateur) REFERENCES ORGANISATEUR(id_organisateur),
   FOREIGN KEY(id_prestataire) REFERENCES PRESTATAIRE(id_prestataire)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS NOTE(
   id_note INT,
   libelle_note INT,
   id_prestataire INT NOT NULL,
   id_public INT UNSIGNED NOT NULL,
   PRIMARY KEY(id_note),
   FOREIGN KEY(id_prestataire) REFERENCES PRESTATAIRE(id_prestataire),
   FOREIGN KEY(id_public) REFERENCES PUBLIC(id_public)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS COMMENTAIRE (
   id_commentaire INT,
   libelle_commentaire VARCHAR(1000),
   id_prestataire INT NOT NULL,
   id_public INT UNSIGNED NOT NULL,
   PRIMARY KEY(id_commentaire),
   FOREIGN KEY(id_prestataire) REFERENCES PRESTATAIRE(id_prestataire),
   FOREIGN KEY(id_public) REFERENCES PUBLIC(id_public)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Emet (
   id_contrainte INT,
   id_prestataire INT,
   qte_emet DECIMAL(5,2),
   PRIMARY KEY(id_contrainte, id_prestataire),
   FOREIGN KEY(id_contrainte) REFERENCES CONTRAINTE(id_contrainte),
   FOREIGN KEY(id_prestataire) REFERENCES PRESTATAIRE(id_prestataire)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Collecte (
   id_donnees INT,
   id_organisateur INT,
   PRIMARY KEY(id_donnees, id_organisateur),
   FOREIGN KEY(id_donnees) REFERENCES DONNEES(id_donnees),
   FOREIGN KEY(id_organisateur) REFERENCES ORGANISATEUR(id_organisateur)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Possede (
   id_contrainte INT,
   id_stand INT,
   PRIMARY KEY(id_contrainte, id_stand),
   FOREIGN KEY(id_contrainte) REFERENCES CONTRAINTE(id_contrainte),
   FOREIGN KEY(id_stand) REFERENCES STAND(id_stand)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Renseigne (
   id_donnees INT,
   id_public INT UNSIGNED NOT NULL,
   valeur VARCHAR(60),
   PRIMARY KEY(id_donnees, id_public),
   FOREIGN KEY(id_donnees) REFERENCES DONNEES(id_donnees),
   FOREIGN KEY(id_public) REFERENCES PUBLIC(id_public)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Participe (
   id_public INT UNSIGNED NOT NULL,
   id_course INT,
   position_classement INT,
   PRIMARY KEY(id_public, id_course),
   FOREIGN KEY(id_public) REFERENCES PUBLIC(id_public),
   FOREIGN KEY(id_course) REFERENCES COURSES(id_course)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Fait (
   id_public INT UNSIGNED NOT NULL,
   id_initiation INT,
   PRIMARY KEY(id_public, id_initiation),
   FOREIGN KEY(id_public) REFERENCES PUBLIC(id_public),
   FOREIGN KEY(id_initiation) REFERENCES INITIATION(id_initiation)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Depends (
   id_bien INT,
   id_reservation INT,
   montant DECIMAL(6,2),
   quantite INT,
   PRIMARY KEY(id_bien, id_reservation),
   FOREIGN KEY(id_bien) REFERENCES BIENS(id_bien),
   FOREIGN KEY(id_reservation) REFERENCES RESERVATION(id_reservation)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS A_Propos (
   id_initiation INT,
   id_reservation INT,
   nb_reserve_initiation INT,
   PRIMARY KEY(id_initiation, id_reservation),
   FOREIGN KEY(id_initiation) REFERENCES INITIATION(id_initiation),
   FOREIGN KEY(id_reservation) REFERENCES RESERVATION(id_reservation)
) CHARACTER SET utf8;

CREATE TABLE Pour (
   id_course INT,
   id_reservation INT,
   nb_reserve_course INT,
   PRIMARY KEY(id_course, id_reservation),
   FOREIGN KEY(id_course) REFERENCES COURSES(id_course),
   FOREIGN KEY(id_reservation) REFERENCES RESERVATION(id_reservation)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Donne (
   id_public INT UNSIGNED NOT NULL,
   id_note INT,
   PRIMARY KEY(id_public, id_note),
   FOREIGN KEY(id_public) REFERENCES PUBLIC(id_public),
   FOREIGN KEY(id_note) REFERENCES NOTE(id_note)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Associe (
   id_prestataire INT,
   id_note INT,
   PRIMARY KEY(id_prestataire, id_note),
   FOREIGN KEY(id_prestataire) REFERENCES PRESTATAIRE(id_prestataire),
   FOREIGN KEY(id_note) REFERENCES NOTE(id_note)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Detient (
   id_type INT,
   id_prestataire INT,
   id_caracteristique INT,
   PRIMARY KEY(id_type, id_prestataire, id_caracteristique),
   FOREIGN KEY(id_type) REFERENCES TYPE_PRESTATAIRE(id_type),
   FOREIGN KEY(id_prestataire) REFERENCES PRESTATAIRE(id_prestataire),
   FOREIGN KEY(id_caracteristique) REFERENCES CARACTERISTIQUE(id_caracteristique)
) CHARACTER SET utf8;
