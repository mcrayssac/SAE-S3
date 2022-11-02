LOAD DATA LOCAL INFILE 'IDENTIFICATION.csv' INTO TABLE IDENTIFICATION FIELDS TERMINATED BY ',';

LOAD DATA LOCAL INFILE 'LIEU.csv' INTO TABLE LIEU FIELDS TERMINATED BY ',';

LOAD DATA LOCAL INFILE 'LANGUES.csv' INTO TABLE LANGUES FIELDS TERMINATED BY ',';

LOAD DATA LOCAL INFILE 'PERIODE.csv' INTO TABLE PERIODE FIELDS TERMINATED BY ',';

LOAD DATA LOCAL INFILE 'SPORT.csv' INTO TABLE SPORT FIELDS TERMINATED BY ',';

LOAD DATA LOCAL INFILE 'STAND.csv' INTO TABLE STAND FIELDS TERMINATED BY ',';

LOAD DATA LOCAL INFILE 'TYPE_PRESTATAIRE.csv' INTO TABLE TYPE_PRESTATAIRE FIELDS TERMINATED BY ',';

LOAD DATA LOCAL INFILE 'COURSES.csv' INTO TABLE COURSES FIELDS TERMINATED BY ',';

select * from IDENTIFICATION;
select * from LIEU;
select * from LANGUES;
select * from PERIODE;
select * from SPORT;
select * from STAND;
select * from TYPE_PRESTATAIRE;
select * from COURSES;


LOAD DATA LOCAL INFILE 'ORGANISATEUR.csv' INTO TABLE ORGANISATEUR FIELDS TERMINATED BY ','; -- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

LOAD DATA LOCAL INFILE 'PRESTATAIRE.csv' INTO TABLE PRESTATAIRE FIELDS TERMINATED BY ',';

select * from ORGANISATEUR;
select * from PRESTATAIRE;
/*
INSERT INTO BIENS (libelle_bien, montant_bien, id_prestataire) VALUES
    ("velo tout terrain", 102.2, 2),
    ("boules pétanque", 12.99, 2)
;

INSERT INTO PUBLIC (username, id_langue) VALUES
    ("public1", 2),
    ("public2", 1),
    ("public3", 1)
;

/* ==================== connection ==================== */
-- var =   select role
    --         from IDENTIFICATION
    --         where username = PARAMETRE
    --         ;

-- ==================== var = 1 :
    -- select id_public
    -- from PUBLIC as p
    -- where username = PARAMETRE
    -- ;

-- ==================== var = 2 :
    -- select nom_prestataire
    -- from PRESTATAIRE
    -- where username = PARAMETRE
    -- ;

-- ==================== var = 3 :
    -- select nom_organisateur
    -- from ORGANISATEUR
    -- where username = PARAMETRE
    -- ;

/* ==================== reservation d'un public a course / services / course ==================== */

/*
-- reservation services / biens --> magasin
INSERT INTO RESERVATION (date_heure_reservation, id_public) VALUES
    ("2023-07-28 11:23:12", 1),
    ("2023-07-29 11:23:12", 1),
    ("2023-07-28 11:23:12", 1),
    ("2023-07-29 11:23:12", 1)
;

INSERT INTO Depends (id_bien, id_reservation, montant, quantite) VALUES
    (1, 1, 102.2, 1),
    (1, 2, 102.2, 1)
;

/* ==================== suppression d'elements ==================== */

-- ============================================================ supression compte public ============================================================
-- var = select * from NOTE where id_public = PARAMETRE;
--     var != []
--         delete COMMENTAIRE where id_public = PARAMETRE;
--         delete NOTE where id_public = PARAMETRE;

-- var = select * from Participe where id_public = PARAMETRE;
--     var != []
--         delete from Participe where id_public = PARAMETRE;

-- var = select id_reservation from RESERVATION where id_public = PARAMETRE;
--     var = ![]
--         bien = select id_reservation from Depends where id_reservation in var;
--             bien != []
--                 delete from Depends where id_reservation in bien;
--                 var.splice(bien)
--             course = select id_reservation from Pour where id_reservation in var;
--                 course != []
--                     delete from Pour where id_reservation in course;
--                     var.splice(course)
--                 course = []
--                     delete from A_Propos where id_reservation in var;
--         delete from RESERVATION where id_public = PARAMETRE;
-- delete from Fait where id_public = PARAMETRE;
-- username = select username from PUBLIC where id_public = PARAMETRE;
-- delete from PUBLIC where id_public = PARAMETRE;

-- ============================================================ supression reservation ============================================================
-- bien = select * from Depends where id_reservation = PARAMETRE;
--     bien != []
--         delete from Depends where id_reservation = PARAMETRE;
--     bien = []
--         course = select * from Pour where id_reservation = PARAMETRE;
--             course != []
--                 delete from Pour where id_reservation = PARAMETRE;
--             course = []
--                 delete from A_Propos where id_reservation = PARAMETRE;
-- delete from RESERVATION where id_reservation = PARAMETRE;

-- ============================================================ supression prestataire ============================================================

-- A VOIR EN FCT° DE CONTENU ET PHOTO

-- var = select * from NOTE where id_prestataire = PARAMETRE;
--     var != []
--         delete COMMENTAIRE where id_prestataire = PARAMETRE;
--         delete NOTE where id_prestataire = PARAMETRE;

-- initiation = select id_initiation from INITIATION where id_prestataire = PARAMETRE;
--     initiation != []
--         id = select id_reservation from A_Propos where id_initiation in initiation;
--             id != []
--                 delete from A_Propos where id_initiation in initiation;
--                 delete from RESERVATION where id_reservation in id;
--             delete from Fait where id_initiation in initiation;
--         delete from INITIATION where id_initiation = initiation;

-- bien = select id_bien from BIENS where id_prestataire = PARAMETRE;
--     bien = ![]
--         id = select id_reservation from Depends where id_bien in bien;
--             id = ![]
--                 delete from Depends where id_reservation in id;
--                 delete from RESERVATION where id_reservation in id;
--         delete from BIENS where id_bien in bien;
-- username = select username from PRESTATAIRE where id_prestataire = PARAMETRE;
-- delete from PRESTATAIRE where id_prestataire = PARAMETRE; -- + suppression de tt ou celui à supprimer intervient;

-- ============================================================ supression identification ============================================================
-- delete from IDENTIFICATION where username = username; -- des que suppression d'un compte !!!

-- ============================================================ supression prestataire ============================================================
