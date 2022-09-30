#====DROP TABLE====
DROP TABLE IF EXISTS Participe;
DROP TABLE IF EXISTS Collecte;
DROP TABLE IF EXISTS Depends;
DROP TABLE IF EXISTS Emet;
DROP TABLE IF EXISTS Visite;
DROP TABLE IF EXISTS SERVICE;
DROP TABLE IF EXISTS PRESTATAIRE;
DROP TABLE IF EXISTS ACTIVITE;
DROP TABLE IF EXISTS ORGANISATEUR;
DROP TABLE IF EXISTS VALEUR;
DROP TABLE IF EXISTS RESERVATION;
DROP TABLE IF EXISTS FESTIVAL;
DROP TABLE IF EXISTS PUBLIC;
DROP TABLE IF EXISTS TYPE;
DROP TABLE IF EXISTS CARACTERISTIQUE;
DROP TABLE IF EXISTS DONNEES;
DROP TABLE IF EXISTS BESOIN;


#====CREATE TABLE IF NOT EXISTS====
CREATE TABLE IF NOT EXISTS BESOIN(
   id_besoin INT AUTO_INCREMENT NOT NULL,
   libelle_besoin VARCHAR(100),
   PRIMARY KEY(id_besoin)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS DONNEES(
   id_donnees INT AUTO_INCREMENT NOT NULL,
   libelle_donnees VARCHAR(50),
   PRIMARY KEY(id_donnees)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS CARACTERISTIQUE(
   id_caracteristique INT AUTO_INCREMENT NOT NULL,
   libelle_caracteristique VARCHAR(50),
   id_donnees INT NOT NULL,
   PRIMARY KEY(id_caracteristique),
   FOREIGN KEY(id_donnees) REFERENCES DONNEES(id_donnees)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS TYPE(
   id_type INT AUTO_INCREMENT NOT NULL,
   etat_type VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_type)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS PUBLIC(
   id_public INT AUTO_INCREMENT NOT NULL,
   username_public VARCHAR(100),
   password_public VARCHAR(5000),
   num_public INT,
   id_type INT NOT NULL,
   PRIMARY KEY(id_public),
   FOREIGN KEY(id_type) REFERENCES TYPE(id_type)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS FESTIVAL(
   id_festival INT AUTO_INCREMENT NOT NULL,
   nom_festival VARCHAR(50),
   date_debut DATE NOT NULL,
   date_fin DATE NOT NULL,
   PRIMARY KEY(id_festival)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS RESERVATION(
   id_reservation INT AUTO_INCREMENT NOT NULL,
   date_heure_reservation DATETIME,
   id_public INT NOT NULL,
   PRIMARY KEY(id_reservation),
   FOREIGN KEY(id_public) REFERENCES PUBLIC(id_public)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS VALEUR(
   id_public INT AUTO_INCREMENT NOT NULL,
   libelle_valeur VARCHAR(50),
   id_valeur INT NOT NULL,
   id_donnees INT NOT NULL,
   PRIMARY KEY(id_public),
   FOREIGN KEY(id_valeur) REFERENCES PUBLIC(id_public),
   FOREIGN KEY(id_donnees) REFERENCES DONNEES(id_donnees)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS ORGANISATEUR(
   id_organisateur INT AUTO_INCREMENT NOT NULL,
   nom_organisateur VARCHAR(100),
   username_organisateur VARCHAR(100),
   password_organisateur VARCHAR(5000),
   email_organisateur VARCHAR(100),
   telephone_organisateur VARCHAR(10),
   adresse_organisateur VARCHAR(100),
   id_festival INT NOT NULL,
   PRIMARY KEY(id_organisateur),
   FOREIGN KEY(id_festival) REFERENCES FESTIVAL(id_festival)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS ACTIVITE(
   id_activite INT AUTO_INCREMENT NOT NULL,
   libelle_activite VARCHAR(1000),
   id_organisateur INT NOT NULL,
   PRIMARY KEY(id_activite),
   FOREIGN KEY(id_organisateur) REFERENCES ORGANISATEUR(id_organisateur)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS PRESTATAIRE(
   id_prestataire INT AUTO_INCREMENT NOT NULL,
   nom_prestataire VARCHAR(100),
   username_prestataire VARCHAR(100),
   password_prestataire VARCHAR(5000),
   email_prestataire VARCHAR(100),
   telephone_prestataire VARCHAR(10),
   adresse_prestataire VARCHAR(100),
   id_organisateur INT NOT NULL,
   PRIMARY KEY(id_prestataire),
   FOREIGN KEY(id_organisateur) REFERENCES ORGANISATEUR(id_organisateur)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS SERVICE(
   id_service INT AUTO_INCREMENT NOT NULL,
   libelle_service VARCHAR(100),
   montant_service DECIMAL(6,2),
   id_prestataire INT NOT NULL,
   PRIMARY KEY(id_service),
   FOREIGN KEY(id_prestataire) REFERENCES PRESTATAIRE(id_prestataire)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Visite(
   id_public INT,
   id_prestataire INT,
   PRIMARY KEY(id_public, id_prestataire),
   FOREIGN KEY(id_public) REFERENCES PUBLIC(id_public),
   FOREIGN KEY(id_prestataire) REFERENCES PRESTATAIRE(id_prestataire)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Emet(
   id_prestataire INT,
   id_besoin INT,
   PRIMARY KEY(id_prestataire, id_besoin),
   FOREIGN KEY(id_prestataire) REFERENCES PRESTATAIRE(id_prestataire),
   FOREIGN KEY(id_besoin) REFERENCES BESOIN(id_besoin)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Depends(
   id_service INT,
   id_reservation INT,
   montant DECIMAL(6,2),
   quantite INT,
   PRIMARY KEY(id_service, id_reservation),
   FOREIGN KEY(id_service) REFERENCES SERVICE(id_service),
   FOREIGN KEY(id_reservation) REFERENCES RESERVATION(id_reservation)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Collecte(
   id_organisateur INT,
   id_donnees INT,
   PRIMARY KEY(id_organisateur, id_donnees),
   FOREIGN KEY(id_organisateur) REFERENCES ORGANISATEUR(id_organisateur),
   FOREIGN KEY(id_donnees) REFERENCES DONNEES(id_donnees)
)CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Participe(
   id_public INT,
   id_activite INT,
   classement INT,
   PRIMARY KEY(id_public, id_activite),
   FOREIGN KEY(id_public) REFERENCES PUBLIC(id_public),
   FOREIGN KEY(id_activite) REFERENCES ACTIVITE(id_activite)
)CHARACTER SET utf8;
