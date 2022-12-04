==================== inscription public ====================
-- var = select * from PUBLIC where email_public like '%public1@gmail.com%';
-- var != []
--     return "adresse mail déjà utilisée"

-- var = []
--     insert into PUBLIC -- (prenom_public, nom_public, email_public, passwd_public, id_langue)
--     values (default, 'PARAMETRE', 'PARAMETRE', 'PARAMETRE', 'PARAMETRE', 1)
--     ;

==================== inscription prestataire ====================
-- insert into PRESTATAIRE -- (nom_prestataire, email_prestataire, telephone_prestataire, site_web_prestataire, passwd_prestataire, id_stand, id_type)
-- value (default, PARAMETRE, PARAMETRE, PARAMETRE, PARAMETRE, PARAMETRE, NULL, PARAMETRE)
-- ;

-- id = select max(id_prestataire) from PRESTATAIRE;

-- insert into Emet -- (id_contrainte, id_prestataire, qte_emet)
-- values (PARAMETRE, id, PARAMETRE)
-- ;

==================== connection ====================

-- var = [] : "email ou password invalide"

-- var =   select nom_organisateur
--         from ORGANISATEUR
--         where email_organisateur like '%PARAMETRE%' and passwd_organisateur like '%PARAMETRE%'
--         ;

-- var =   select nom_prestataire
--         from PRESTATAIRE
--         where email_prestataire like '%PARAMETRE%' and passwd_prestataire like '%PARAMETRE%'
--         ;

-- var =   select prenom_public, nom_public
--         from PUBLIC
--         where email_public like '%PARAMETRE%' and passwd_public like '%PARAMETRE'
--         ;

==================== reservation d un public a course / initiation ====================

-- insert into RESERVATION -- (date_heure_reservation, id_public)
-- values (default, 'PARAMETRE', PARAMETRE)
-- ;

-- -- reservation pour une course
-- insert into Pour -- (id_course, id_reservation, nb_reserve_course)
-- values (PARAMETRE, (select max(id_reservation) from RESERVATION), PARAMETRE)
-- ;

-- reservation pour une initiation
-- insert into A_Propos -- (id_initiation, id_reservation, nb_reserve_initiation)
-- values (PARAMETRE, (select max(id_reservation) from RESERVATION), PARAMETRE)
-- ;

============================================================ visualisation des reservations de la journée ============================================================

/* ==================== visualisation initiations ==================== */
-- select i.libelle_initiation, a.nb_reserve_initiation
-- from A_Propos as a
-- left join INITIATION as i on i.id_initiation = a.id_initiation
-- where a.id_reservation in (
--     select id_reservation
--     from RESERVATION
--     where id_public = 1 and date_periode = '2023-07-28 11:30:00'
-- )
-- ;

==================== visualisation courses ====================
-- select c.libelle_course, c.nb_km, c.prix, p.nb_reserve_course, c.prix*p.nb_reserve_course as montant_total
-- from Pour as p
-- left join COURSES as c on c.id_course = p.id_course
-- where p.id_reservation in (
--     select id_reservation
--     from RESERVATION
--     where id_public = PARAMETRE and date_periode = PARAMETRE
-- )
-- ;

============================================================ visualisation pos classmt ============================================================
-- select c.libelle_course, pa.position_classement, p.prenom_public, p.nom_public
-- from Participe as pa
-- inner join COURSES as c on c.id_course = pa.id_course
-- inner join PUBLIC as p on p.id_public = pa.id_public
-- where c.id_course = 3
-- order by pa.position_classement
-- ;

-- ==================== en fct nom recherché
-- select c.libelle_course, pa.position_classement, p.prenom_public, p.nom_public
-- from Participe as pa
-- inner join COURSES as c on c.id_course = pa.id_course
-- inner join PUBLIC as p on p.id_public = pa.id_public
-- where p.prenom_public like '%PARAMETRE%' and p.nom_public like '%PARAMETRE%' and pa.id_course = PARAMETRE
-- ;

============================================================ supression commentaire par public ============================================================
-- var = select * from COMMENTAIRE where id_public = PARAMETRE;
--     var != []
--         delete from COMMENTAIRE where id_public = PARAMETRE;
-- var = select * from NOTE where id_public = PARAMETRE;
--     var.length = 1:
--         delete from NOTE where id_public = PARAMETRE;

============================================================ supression compte public ============================================================
-- var = select * from NOTE where id_public = PARAMETRE;
--     var != []
--         delete from COMMENTAIRE where id_public = PARAMETRE;
--         delete from NOTE where id_public = PARAMETRE;

-- var = select * from Participe where id_public = PARAMETRE;
--     var != []
--         delete from Participe where id_public = PARAMETRE;

-- var = select id_reservation from RESERVATION where id_public = PARAMETRE;
--     var = ![]
--         course = select id_reservation from Pour where id_reservation in var;
--             course != []
--                 delete from Pour where id_reservation in course;
--                 var.splice(course)
--             delete from A_Propos where id_reservation in var;
--         delete from RESERVATION where id_public = PARAMETRE;

-- username = select username from PUBLIC where id_public = PARAMETRE;
-- delete from PUBLIC where id_public = PARAMETRE;

============================================================ supression reservation ============================================================
-- course = select * from Pour where id_reservation = PARAMETRE;
--     course != []
--         delete from Pour where id_reservation = PARAMETRE;
--     course = []
--         delete from A_Propos where id_reservation = PARAMETRE;
-- delete from RESERVATION where id_reservation = PARAMETRE;

============================================================ supression prestataire ============================================================

-- exist = select * from prestataire where id_prestataire = PARAMETRE;

-- exist != []
    -- var = select * from NOTE where id_prestataire = PARAMETRE;
        -- var != []
    --         delete from COMMENTAIRE where id_prestataire = PARAMETRE;
    --         delete from NOTE where id_prestataire = PARAMETRE;

    -- -- initiation = select id_initiation from INITIATION where id_prestataire = PARAMETRE;
    --     -- initiation != []
    --         -- id = select id_reservation from A_Propos where id_initiation in initiation;
    --             -- id != []
    --                 delete from A_Propos where id_initiation in initiation;
    --                 delete from RESERVATION where id_reservation in id;
    --         delete from INITIATION where id_initiation in initiation;

    -- delete from Detient where id_prestataire = PARAMETRE; -- ================================================================================================================================================================================================================================================
    -- delete from Emet where id_prestataire = PARAMETRE;
    -- delete from PRESTATAIRE where id_prestataire = PARAMETRE;

/* ==================== initiation ==================== */

============================================================ prestataire propose initiation ============================================================
-- insert into INITIATION -- (libelle_initiation, etat_initiation, date_periode, id_lieu, id_prestataire)
-- values (default, 'PARAMETRE', 1, 'PARAMETRE', PARAMETRE, PARAMETRE)
-- ;

============================================================ organisateur accepte initiation ============================================================
-- select presta.nom_prestataire, i.libelle_initiation, p.date_periode, l.libelle_lieu, (case when i.etat_initiation = 0 then 'acceptée' else 'en attente' end) as état
-- from INITIATION as i
-- inner join PRESTATAIRE as presta on presta.id_prestataire = i.id_prestataire
-- inner join PERIODE as p on p.date_periode = i.date_periode
-- inner join  LIEU as l on l.id_lieu = i.id_lieu
-- ;

-- update INITIATION set etat_initiation = 0 where id_initiation = PARAMETRE;

============================================================ visualiser les activites de la scene ============================================================
-- select  init.libelle_initiation, presta.nom_prestataire, p.date_periode
-- from INITIATION as init
-- inner join PRESTATAIRE as presta on presta.id_prestataire = init.id_prestataire
-- inner join PERIODE as p on p.date_periode = init.date_periode
-- inner join  LIEU as l on l.id_lieu = init.id_lieu
-- where l.libelle_lieu like 'scene'
-- ;

============================================================ prestataire regarde ses initiations ============================================================
-- select init.libelle_initiation, p.date_periode, l.libelle_lieu
-- from INITIATION as init
-- inner join PERIODE as p on p.date_periode = init.date_periode
-- inner join  LIEU as l on l.id_lieu = init.id_lieu
-- where init.id_prestataire = PARAMETRE
-- ;

============================================================ visualiser la page d un prestataire ============================================================
-- select p.id_prestataire, p.nom_prestataire, p.email_prestataire, p.telephone_prestataire, p.site_web_prestataire, tp.etat_type,
--         i.libelle_initiation, i.date_periode, (case when l.libelle_lieu = 'Stand' then 'Directement sur place !' end)
-- from PRESTATAIRE as p
-- inner join TYPE_PRESTATAIRE as tp on tp.id_type = p.id_type
-- inner join INITIATION as i on i.id_prestataire = p.id_prestataire
-- inner join LIEU as l on l.id_lieu = i.id_lieu
-- where p.id_prestataire = $1
-- ;

-- stand avec contraintes
-- filtres contraintes prestataire