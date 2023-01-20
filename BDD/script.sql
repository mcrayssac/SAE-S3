/* ====== accepte ====== */
/* ====== id_organisateur dans courses ====== */
SET
CLIENT_ENCODING TO 'UTF8';
DROP TABLE IF EXISTS Correspond;
DROP TABLE IF EXISTS Detient;
DROP TABLE IF EXISTS Pour;
DROP TABLE IF EXISTS A_Propos;
DROP TABLE IF EXISTS Participe;
DROP TABLE IF EXISTS Possede;
DROP TABLE IF EXISTS Emet;
DROP TABLE IF EXISTS COMMENTAIRE;
DROP TABLE IF EXISTS INITIATION;
DROP TABLE IF EXISTS COURSES;
DROP TABLE IF EXISTS CLIC;
DROP TABLE IF EXISTS NOTE;
DROP TABLE IF EXISTS RESERVATION;
DROP TABLE IF EXISTS CARACTERISTIQUE;
DROP TABLE IF EXISTS PERIODE;
DROP TABLE IF EXISTS LIEU;
DROP TABLE IF EXISTS SPORT;
DROP TABLE IF EXISTS PRESTATAIRE;
DROP TABLE IF EXISTS STAND;
DROP TABLE IF EXISTS FAMILLE;
DROP TABLE IF EXISTS TAILLE;
DROP TABLE IF EXISTS TYPE_PRESTATAIRE;
DROP TABLE IF EXISTS CONTRAINTE;
DROP TABLE IF EXISTS ORGANISATEUR;
DROP TABLE IF EXISTS PUBLIC;
DROP TABLE IF EXISTS AGE;
DROP TABLE IF EXISTS SEXE;
DROP TABLE IF EXISTS PAYS;
DROP TABLE IF EXISTS LANGUES;

CREATE TABLE AGE
(
    id_age      SERIAL,
    libelle_age VARCHAR(50),
    CONSTRAINT pk_age PRIMARY KEY (id_age)
);

CREATE TABLE CONTRAINTE
(
    id_contrainte      SERIAL,
    libelle_contrainte VARCHAR(100),
    CONSTRAINT pk_contrainte PRIMARY KEY (id_contrainte)
);

CREATE TABLE LANGUES
(
    id_langue      SERIAL,
    libelle_langue VARCHAR(50),
    CONSTRAINT pk_langues PRIMARY KEY (id_langue)
);

CREATE TABLE PAYS
(
    id_pays      SERIAL,
    libelle_pays VARCHAR(100),
    CONSTRAINT pk_pays PRIMARY KEY (id_pays)
);

CREATE TABLE TAILLE
(
    id_taille      SERIAL,
    libelle_taille VARCHAR(50),
    CONSTRAINT pk_taille PRIMARY KEY (id_taille)
);

CREATE TABLE FAMILLE
(
    id_famille      SERIAL,
    libelle_famille VARCHAR(100),
    CONSTRAINT pk_famille PRIMARY KEY (id_famille)
);


CREATE TABLE SEXE
(
    id_sexe      SERIAL,
    libelle_sexe VARCHAR(10),
    CONSTRAINT pk_sexe PRIMARY KEY (id_sexe)
);

CREATE TABLE STAND
(
    id_stand    SERIAL,
    coordonne_x DECIMAL(20, 15),
    coordonne_y DECIMAL(20, 15),
    rotation    DECIMAL(20, 15),
    id_taille   INT,
    CONSTRAINT pk_stand PRIMARY KEY (id_stand),
    CONSTRAINT fk_taille_stand FOREIGN KEY (id_taille) REFERENCES TAILLE (id_taille)
);

CREATE TABLE TYPE_PRESTATAIRE
(
    id_type   SERIAL,
    etat_type VARCHAR(50),
    CONSTRAINT pk_type_prestataire PRIMARY KEY (id_type)
);

CREATE TABLE PUBLIC
(
    id_public     SERIAL,
    prenom_public VARCHAR(100),
    nom_public    VARCHAR(100),
    email_public  VARCHAR(100),
    passwd_public VARCHAR(100),
    id_langue     INT NOT NULL,
    id_age        INT NOT NULL,
    id_sexe       INT NOT NULL,
    id_pays       INT NOT NULL,
    CONSTRAINT pk_public PRIMARY KEY (id_public),
    CONSTRAINT fk_langue_public FOREIGN KEY (id_langue) REFERENCES LANGUES (id_langue),
    CONSTRAINT fk_age_public FOREIGN KEY (id_age) REFERENCES AGE (id_age),
    CONSTRAINT fk_sexe_public FOREIGN KEY (id_sexe) REFERENCES SEXE (id_sexe),
    CONSTRAINT fk_pays_public FOREIGN KEY (id_pays) REFERENCES PAYS (id_pays)
);

CREATE TABLE ORGANISATEUR
(
    id_organisateur        SERIAL,
    nom_organisateur       VARCHAR(100),
    email_organisateur     VARCHAR(100),
    telephone_organisateur VARCHAR(20),
    passwd_organisateur    VARCHAR(100),
    CONSTRAINT pk_organisateur PRIMARY KEY (id_organisateur)
);

CREATE TABLE LIEU
(
    id_lieu      SERIAL,
    libelle_lieu VARCHAR(50),
    CONSTRAINT pk_lieu PRIMARY KEY (id_lieu)
);

CREATE TABLE SPORT
(
    id_sport      SERIAL,
    libelle_sport VARCHAR(100),
    CONSTRAINT pk_sport PRIMARY KEY (id_sport)
);

CREATE TABLE PERIODE
(
    date_periode TIMESTAMP,
    CONSTRAINT pk_periode PRIMARY KEY (date_periode)
);

CREATE TABLE RESERVATION
(
    id_reservation SERIAL,
    date_periode   TIMESTAMP,
    id_public      INT NOT NULL,
    CONSTRAINT pk_reservation PRIMARY KEY (id_reservation),
    CONSTRAINT fk_periode_reservation FOREIGN KEY (date_periode) REFERENCES PERIODE (date_periode),
    CONSTRAINT fk_public_reservation FOREIGN KEY (id_public) REFERENCES PUBLIC (id_public) ON DELETE CASCADE
);


CREATE TABLE CARACTERISTIQUE
(
    id_caracteristique      SERIAL,
    libelle_caracteristique VARCHAR(50),
    id_famille              INT NOT NULL,
    PRIMARY KEY (id_caracteristique),
    CONSTRAINT fk_famille_caracteristique FOREIGN KEY (id_famille) REFERENCES FAMILLE (id_famille)
);


CREATE TABLE PRESTATAIRE
(
    id_prestataire        SERIAL,
    nom_prestataire       VARCHAR(100),
    email_prestataire     VARCHAR(100),
    telephone_prestataire VARCHAR(20),
    site_web_prestataire  VARCHAR(100),
    passwd_prestataire    VARCHAR(100),
    etat_inscription      BOOLEAN,
    id_stand              INT,
    id_type               INT NOT NULL,
    text_gauche           TEXT,
    text_droite           TEXT,
    url_image           TEXT,
    image_body            TEXT,
    CONSTRAINT pk_prestataire PRIMARY KEY (id_prestataire),
    CONSTRAINT fk_stand_prestataire FOREIGN KEY (id_stand) REFERENCES STAND (id_stand),
    CONSTRAINT fk_type_prestataire FOREIGN KEY (id_type) REFERENCES TYPE_PRESTATAIRE (id_type)
);

CREATE TABLE COURSES
(
    id_course      SERIAL,
    libelle_course VARCHAR(100),
    nb_km          INT,
    nb_place       INT,
    prix           DECIMAL(4, 2),
    trace          VARCHAR(8000),
    url_image      VARCHAR(8000),
    date_periode   TIMESTAMP NOT NULL,
    id_sport       INT       NOT NULL,
    id_lieu        INT       NOT NULL,
    CONSTRAINT pk_courses PRIMARY KEY (id_course),
    CONSTRAINT fk_periode_courses FOREIGN KEY (date_periode) REFERENCES PERIODE (date_periode),
    CONSTRAINT fk_sport_courses FOREIGN KEY (id_sport) REFERENCES SPORT (id_sport),
    CONSTRAINT fk_lieu_courses FOREIGN KEY (id_lieu) REFERENCES LIEU (id_lieu)
);

CREATE TABLE INITIATION
(
    id_initiation      SERIAL,
    libelle_initiation VARCHAR(1000),
    etat_initiation    INT,
    date_periode       TIMESTAMP NOT NULL,
    fin_periode        TIMESTAMP NOT NULL,
    nb_places          INT,
    id_lieu            INT       NOT NULL,
    id_prestataire     INT       NOT NULL,
    CONSTRAINT pk_initiation PRIMARY KEY (id_initiation),
    CONSTRAINT fk_periode_initiation FOREIGN KEY (date_periode) REFERENCES PERIODE (date_periode),
    CONSTRAINT fk_lieu_initiation FOREIGN KEY (id_lieu) REFERENCES LIEU (id_lieu),
    CONSTRAINT fk_prestataire_initiation FOREIGN KEY (id_prestataire) REFERENCES PRESTATAIRE (id_prestataire) ON DELETE CASCADE
);

CREATE TABLE NOTE
(
    id_note        SERIAL,
    libelle_note   DECIMAL(3, 1),
    id_prestataire INT NOT NULL,
    id_public      INT NOT NULL,
    CONSTRAINT pk_note PRIMARY KEY (id_note),
    CONSTRAINT fk_prestataire_note FOREIGN KEY (id_prestataire) REFERENCES PRESTATAIRE (id_prestataire) ON DELETE CASCADE,
    CONSTRAINT fk_public_note FOREIGN KEY (id_public) REFERENCES PUBLIC (id_public) ON DELETE CASCADE
);

CREATE TABLE CLIC
(
    id_clic        SERIAL,
    jour           TIMESTAMP NOT NULL,
    id_prestataire INT       NOT NULL,
    PRIMARY KEY (id_clic),
    CONSTRAINT fk_prestataire_clic FOREIGN KEY (id_prestataire) REFERENCES PRESTATAIRE (id_prestataire) ON DELETE CASCADE
);

CREATE TABLE COMMENTAIRE
(
    id_commentaire      SERIAL,
    libelle_commentaire VARCHAR(1000),
    id_prestataire      INT NOT NULL,
    id_public           INT NOT NULL,
    CONSTRAINT pk_commentaire PRIMARY KEY (id_commentaire),
    CONSTRAINT fk_prestataire_commentaire FOREIGN KEY (id_prestataire) REFERENCES PRESTATAIRE (id_prestataire) ON DELETE CASCADE,
    CONSTRAINT fk_public_commentaire FOREIGN KEY (id_public) REFERENCES PUBLIC (id_public) ON DELETE CASCADE
);

CREATE TABLE Emet
(
    id_contrainte  INT NOT NULL,
    id_prestataire INT NOT NULL,
    CONSTRAINT pk_emet PRIMARY KEY (id_contrainte, id_prestataire),
    CONSTRAINT fk_contrainte_emet FOREIGN KEY (id_contrainte) REFERENCES CONTRAINTE (id_contrainte),
    CONSTRAINT fk_prestataire_emet FOREIGN KEY (id_prestataire) REFERENCES PRESTATAIRE (id_prestataire) ON DELETE CASCADE
);

CREATE TABLE Possede
(
    id_contrainte INT NOT NULL,
    id_stand      INT NOT NULL,
    CONSTRAINT pk_possede PRIMARY KEY (id_contrainte, id_stand),
    CONSTRAINT fk_contrainte_possede FOREIGN KEY (id_contrainte) REFERENCES CONTRAINTE (id_contrainte),
    CONSTRAINT fk_stand_possede FOREIGN KEY (id_stand) REFERENCES STAND (id_stand)
);

CREATE TABLE Participe
(
    id_public           INT NOT NULL,
    id_course           INT NOT NULL,
    position_classement INT,
    CONSTRAINT pk_participe PRIMARY KEY (id_public, id_course),
    CONSTRAINT fk_public_participe FOREIGN KEY (id_public) REFERENCES PUBLIC (id_public) ON DELETE CASCADE,
    CONSTRAINT fk_courses_participe FOREIGN KEY (id_course) REFERENCES COURSES (id_course)
);

CREATE TABLE A_Propos
(
    id_initiation         INT NOT NULL,
    id_reservation        INT NOT NULL,
    nb_reserve_initiation INT,
    CONSTRAINT pk_a_propos PRIMARY KEY (id_initiation, id_reservation),
    CONSTRAINT fk_initiation_a_propos FOREIGN KEY (id_initiation) REFERENCES INITIATION (id_initiation),
    CONSTRAINT fk_reservation_a_propos FOREIGN KEY (id_reservation) REFERENCES RESERVATION (id_reservation)
);

CREATE TABLE Pour
(
    id_course         INT NOT NULL,
    id_reservation    INT NOT NULL,
    nb_reserve_course INT,
    CONSTRAINT pk_pour PRIMARY KEY (id_course, id_reservation),
    CONSTRAINT fk_courses_pour FOREIGN KEY (id_course) REFERENCES COURSES (id_course),
    CONSTRAINT fk_reservation_pour FOREIGN KEY (id_reservation) REFERENCES RESERVATION (id_reservation)
);

CREATE TABLE Detient
(
    id_prestataire     INT NOT NULL,
    id_caracteristique INT NOT NULL,
    CONSTRAINT pk_detient PRIMARY KEY (id_prestataire, id_caracteristique),
    CONSTRAINT fk_prestataire_detient FOREIGN KEY (id_prestataire) REFERENCES PRESTATAIRE (id_prestataire) ON DELETE CASCADE,
    CONSTRAINT fk_caracteristique_detient FOREIGN KEY (id_caracteristique) REFERENCES CARACTERISTIQUE (id_caracteristique)
);

CREATE TABLE Correspond
(
    id_type    INT NOT NULL,
    id_famille INT NOT NULL,
    CONSTRAINT pk_correspond PRIMARY KEY (id_type, id_famille),
    CONSTRAINT fk_type_correspond FOREIGN KEY (id_type) REFERENCES TYPE_PRESTATAIRE (id_type),
    CONSTRAINT fk_famille_correspond FOREIGN KEY (id_famille) REFERENCES FAMILLE (id_famille)
);
