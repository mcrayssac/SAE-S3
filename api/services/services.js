const fs = require('fs');
const chalk = require('chalk');
const bcrypt = require("bcrypt")
const {callback} = require("pg/lib/native/query");
const pool = require("../database/db");
const mapQueries = require("../queries/maps_queries");
const queries = require("../queries/authentification_queries");
const signupQueries = require("../queries/signup_queries");

const getOrganisateur = async (callback) => {
    try {
        pool.query(queries.getOrganisateur, (error, results) => {
            if (error) {
                console.log("F1: error service", error);
                return callback("Error retrieving orga.");
            }
            return callback(null, results.rows)
        });
    } catch (e) {
        console.log(e);
        return callback([]);
    }
}
const getCagnotte = (callback) => {
    let cagnotte = 2435984;
    let objectif = 5000000;
    let pourcentage = Math.round((cagnotte/objectif*100)*100)/100;
    if (cagnotte && objectif && pourcentage){
        return callback(null, {cagnotte : cagnotte, objectif : objectif, pourcentage : pourcentage});
    }else{
        return callback([]);
    }
}

const getSexe = (callback) => {
    let resSexe = ["Femme", "Homme", "Neutre"]
    if (resSexe.length > 0){
        return callback(null, resSexe)
    }else{
        return callback([])
    }
}

const getCourses = (callback) => {
    let resCourses =    [
        ["ORIENTATION",
            {"Sport":" Running", "Distance": "12 km", "Age":" 18 à 25 ans", "Prix": "5€", "Places": "200", "Lieu": "Départ course à pied"},
            "https://www.ffcorientation.fr/media/cms_page_media/16/CO%20%C3%A0%20pied%202_w9ML6Pb.jpg"],
        ["NATATION",
            {"Sport":" Sports d'eau", "Distance": "8 km", "Age":" 18 à 25 ans", "Prix": "7€", "Places": "58", "Lieu": "Départ au lac"},
            "https://contents.mediadecathlon.com/p1265270/k$6ddc26c476bbb8357c54f40477eebe83/800x0/3228pt2061/4303xcr4303/entrainement-pour-eau-libre.jpg?format=auto&quality=80"],
        ["A PIED",
            {"Sport":" Running", "Distance": "10 km", "Age":" 12 à 27 ans",  "Prix": "10€", "Places": "74", "Lieu": "Départ course à pied"},
            "https://www.astucedegrandmere.com/wp-content/uploads/Course-%C3%A0-pieds-les-astuces-pour-sy-mettre-300x300.jpg"],
        ["VTT",
            {"Sport":" Vélo", "Distance": "36 km", "Age":" 12 à 17 ans", "Prix": "11€", "Places": "14", "Lieu": "Départ à l'entrée"},
            "https://img.redbull.com/images/c_crop,x_1693,y_0,h_3525,w_2643/c_fill,w_400,h_540/q_auto:low,f_auto/redbullcom/2017/10/13/9f7e9e7f-4997-4f81-a578-88b3c4f7d795/mass-start-vtt-course-red-bull-foxhunt"],
        ["VTT",
            {"Sport":" Vélo", "Distance": "45 km", "Age":" 12 à 17 ans", "Prix": "11€", "Places": "47", "Lieu": "Départ à l'entrée"},
            "https://img.redbull.com/images/c_crop,x_765,y_0,h_3563,w_2672/c_fill,w_400,h_540/q_auto:low,f_auto/redbullcom/2020/12/3/soj4jzfy69ph4vynscmv/tom-pidcock-mondiaux-vtt-xc-leogang-2020"],
        ["ESCALADE",
            {"Sport":" Escalade", "Hauteur": "15 m", "Age":" 26 et +", "Prix": "13€", "Places": "7", "Lieu": "Départ à l'entrée"},
            "https://www.vertical-art.fr/wp-content/uploads/2022/09/Janja-garnbret-Coupe-du-monde-Jakarta-2022.jpg"]
    ];

    if (resCourses.length > 0){
        return callback(null, resCourses)
    } else {
        return callback([])
    }
}

const getFiltresCourses = (type, callback) => {
    let getFiltres = null;
    if (type === "courses"){
        getFiltres = {"Sport":[" Running"," Escalade", " Sports collectifs", " Sports d'eau"," Sports de précision", " Sports de raquette", " Vélo"],
            "Age":[" 7 à 11 ans", " 12 à 17 ans", " 18 ans à 25 ans", " 26 et +"]
        };
    }
    if (getFiltres){
        return callback(null, getFiltres)
    }else{
        return callback([])
    }
}

const getFiltres = (type, callback) => {
    let getFiltres = null;
    if (type === "restaurants"){
        getFiltres = [["Spécialites", ["Nuggets", "Burger"]],
            ["Places", ["200 places", "100 places", "50 places", "10 places"]]
        ];
    } else if (type === "clubs"){
        getFiltres = [["Sport", ["Basket", "Badminton", "Escrime", "Tir à l'arc", "Natation", "Volley-Ball", "Karting"]],
            ["Date création", ["1880", "1980", "1971", "1928", "1921", "1940", "1970"]],
            ["Localisation", ["Dijon (21000)", "Chambly (60230)", "Clermont-Ferrand (63000)", "Noisy-le-Grand (93160)",
                "Marseille (13000)", "Tours (37000)", "Le Castellet (83330)"]],
            ["Niveau", ["National/Compétition", "Loisirs"]]
        ];
    }
    if (getFiltres){
        return callback(null, getFiltres)
    }else{
        return callback([])
    }
}

const getPrestataire = (type, callback) => {
    let getPrestataire = null;
    if (type === "restaurants"){
        getPrestataire = [
            {
                "title": "Mcdo", "filtres": {"title" : ["Spécialites","Places"], "body" : ["Nuggets", "200 places"]},
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/410px-McDonald%27s_Golden_Arches.svg.png"
            },
            {
                "title": "Burger King", "filtres": {"title" : ["Spécialites","Places"], "body" : ["Burger", "100 places"]},
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/langfr-300px-Burger_King_2020.svg.png"
            },
            {
                "title": "Subway", "filtres": {"title" : ["Spécialites","Places"], "body" : ["Burger", "50 places"]},
                "url": "https://www.enpaysdelaloire.com/sites/default/files/styles/sit/public/sit/images/RESPDL085V503N53/Subway-Logo.jpg?itok=RZcLrk3g"
            },
            {
                "title": "KFC", "filtres": {"title" : ["Spécialites","Places"], "body" : ["Nuggets", "50 places"]},
                "url": "https://upload.wikimedia.org/wikipedia/fr/thumb/b/bf/KFC_logo.svg/langfr-420px-KFC_logo.svg.png"
            },
            {
                "title": "Fatburger", "filtres": {"title" : ["Spécialites","Places"], "body" : ["Burger", "50 places"]},
                "url": "https://play-lh.googleusercontent.com/qIzwUnjAzRjlMo-zJecA4C8u7mHq0Dj_wE2GClyDv7iLFIk2tTJdNHzv03933KljZE0"
            },
            {
                "title": "Five Guys", "filtres": {"title" : ["Spécialites","Places"], "body" : ["Burger", "10 places"]},
                "url": "https://dynl.mktgcdn.com/p/eCdSZKzdeZNQFV4AiM1Z3cDCeBb4ePRc9gxz4JXSmGA/2521x2521.jpg"
            }
        ];
    } else if (type === "clubs"){
        getPrestataire = [
            {
                "title": "JDA Dijon Basket",
                "filtres": {"title" : ["Sport", "Date création", "Localisation","Niveau"], "body" : ["Basket", "1880", "Dijon (21000)", "National/Compétition"]},
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/JDA_Dijon_Basket.png/1200px-JDA_Dijon_Basket.png",
            },
            {
                "title": "BCCO Badminton Club Chambly Oise",
                "filtres": {"title" : ["Sport", "Date création", "Localisation","Niveau"], "body" : ["Badminton", "1980", "Chambly (60230)", "National/Compétition"]},
                "url": "data:image/jpeg;base64,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",
            },
            {
                "title": "SCE Stade Clermontois Escrime",
                "filtres": {"title" : ["Sport", "Date création", "Localisation","Niveau"], "body" : ["Escrime", "1971", "Clermont-Ferrand (63000)", "National/Compétition"]},
                "url":"https://stade-clermontois-escrime.com/wp-content/uploads/2014/06/cropped-logo-page-acceuil-2.png",
            },
            {
                "title": "FFTA Fédération Française Tir à l'Arc",
                "filtres": {"title" : ["Sport", "Date création", "Localisation","Niveau"], "body" : ["Tir à l'arc", "1928", "Noisy-le-Grand (93160)", "National/Compétition"]},
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Logo_FFTA_Quadri.png/800px-Logo_FFTA_Quadri.png",
            },
            {
                "title": "CNM Club Natation Marseille",
                "filtres": {"title" : ["Sport", "Date création", "Localisation","Niveau"], "body" : ["Natation", "1921", "Marseille (13000)", "National/Compétition"]},
                "url": "https://upload.wikimedia.org/wikipedia/fr/thumb/6/60/Logo_CNM.svg/1200px-Logo_CNM.svg.png"
            },
            {
                "title": "TVB Tours Volley-Ball",
                "filtres": {"title" : ["Sport", "Date création", "Localisation","Niveau"], "body" : ["Volley-Ball", "1940", "Tours (37000)", "National/Compétition"]},
                "url": "https://upload.wikimedia.org/wikipedia/fr/thumb/1/15/ToursVBlogo2020.svg/langfr-270px-ToursVBlogo2020.svg.png"
            },
            {
                "title": "KCPR Karting Circuit Paul Ricard",
                "filtres": {"title" : ["Sport", "Date création", "Localisation","Niveau"], "body" : ["Karting", "1970", "Le Castellet (83330)", "Loisirs"]},
                "url": "https://www.kart-center.com/media/data/files/circuits/circuit-paul-ricard.png"
            }
        ];
    }
    if (getPrestataire){
        return callback(null, getPrestataire)
    }else{
        return callback([])
    }
}

const getClub = (club, callback) => {
    let getClub = null;
    if (club === "jdadijonbasket"){
        getClub = {
            "Titre":"JDA Dijon Basket",
            "Image":{"Titre":"https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/JDA_Dijon_Basket.png/1200px-JDA_Dijon_Basket.png",
                    "Body":"https://media.discordapp.net/attachments/894224051571138560/1035446870459301898/jda-dijon-basket-home_1.jpg?width=585&height=585"},
            "Texte":{"Gauche":["La Jeanne d’Arc a été créée en janvier 1880  sous la forme d’un patronage par l’abbé Bizouard. Ce fut, compte tenu du succès du nombre d’adhérents, un déménagement dans le quartier de la plaine des roses dans la rue Lacodaire.",
                "Par trois fois la Jeanne d’Arc a failli sombrer corps et âme. Grace à la volonté, à la ténacité de quelques uns, il n’en fut rien. Lors de la première guerre mondiale 1914/18 la Jeanne d’Arc comptait plus de 450 membres et 57 manquaient à la fin des hostilités.",
                "Aujourd’hui, la Jeanne d’Arc limite ses activités à un seul sport le basket, grâce à trois Présidents remarquables qui sont Emile Jobart, Maurice Lebeau (1946-1967) et Henri Boisselot. (1967-1980)."],
                "Droite":"Suite à une erreur dans un article de presse, un journaliste avait mentionné et abrégé JDA  au lieu de Jeanne d’Arc. C’est ainsi que JDA restera par la suite la dénomination et le logo du getPrestataire."},
            "Initiation":"Nous vous proposons plusieurs petites initiations sur les bases du shoot, du placement",
            "Commentaires": [{"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}]
        };
    } else if (club === "bccobadmintonclubchamblyoise"){
        getClub = {
            "Titre":"BCCO Badminton Club Chambly Oise",
            "Image":{"Titre":"data:image/jpeg;base64,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",
                "Body":"https://cdn.discordapp.com/attachments/894224051571138560/1035452066803486720/USEE-Badminton_2018_Championnat_national_Top12__DSC9674.jpg"},
            "Texte":{"Gauche":["Fondé en 1980, le BCCO est la référence française de la discipline et une place forte européenne.",
                    "Le palmarès du getPrestataire en témoigne : vice-champion de France en 2012 et 2013 puis champion de France de 2014 à 2019 ; vice-champion d'Europe de 2016 à 2019. À cela s'ajoute l'organisation à Beauvais du Final four de la Coupe d'Europe 2014 et, à Chambly, du Final four du Championnat de France 2017, un événement qui a réuni 1500 personnes sur deux jours au sein de la halle des sports Daniel Costantini, l'antre du BCCO.",
                    "Et ce n'est pas tout ! Le badminton getPrestataire brille aussi avec ses jeunes. Sacha Levêque est vice-champion d'Europe et membre de l'équipe de France U17 et Anthony Gourdon est médaillé d’argent au tournoi des 8 Nations et sélectionné en équipe de France U15."],
                "Droite":"L'équipe 1 évolue au plus haut niveau, français et européen. Le 4 mai 2019, l'équipe Top 12 remportait son 6ème titre de Champion de France au terme d'une finale à rebondissements. "},
            "Initiation":"Nous vous proposons plusieurs petites initiations sur les bases du sport, de ses techniques",
            "Commentaires": [{"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}]
        };
    } else if (club === "scestadeclermontoisescrime"){
        getClub = {
            "Titre":"SCE Stade Clermontois Escrime",
            "Image":{"Titre":"https://stade-clermontois-escrime.com/wp-content/uploads/2014/06/cropped-logo-page-acceuil-2.png",
                "Body":"https://cdn.discordapp.com/attachments/894224051571138560/1035460742612263032/badminton.jpg"},
            "Texte":{"Gauche":["Avant la guerre de 1914 dite la Grande guerre l’escrime était enseignée dans les casernes des trois régiments d’infanterie, de cavalerie et d’artillerie. Le sport n’était pratiqué que par une certaine élite sociale.",
                    "Henri Bergson, futur prix Nobel de littérature, enseignait la philosophie au Lycée Blaise Pascal et fréquentait une salle d’armes de 1882 à 1888.",
                    " Les assauts d’escrime étaient organisés en représentation comme ce gala d’escrime donné en 1886 au profit des victimes du cyclone de la Martinique à la Salle d’Armes de l’ancien Hôpital.",
                    "En mars 1889, la salle Culerier rue Blatin, accueillit son Assaut annuel en présence d’un important parterre de spectateurs."],
                "Droite":"En 1903, le Maître Franck, professeur au Lycée Blaise Pascal de Clermont-Ferrand, tenait sa salle d’armes l’hiver, place de la Treille. Chaque été, à Royat, sous les ombrages du parc, il organisait des poules en plein air, entre les maîtres militaires et des amateurs français ou étrangers qui fréquentaient la station thermale."},
            "Initiation":"Nous vous proposons plusieurs petites initiations sur les bases du sport, de ses techniques",
            "Commentaires": [{"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}]
        };
    } else if (club === "fftafédérationfrançaisetiràl'arc"){
        getClub = {
            "Titre":"FFTA Fédération Française Tir à l'Arc",
            "Image":{"Titre":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Logo_FFTA_Quadri.png/800px-Logo_FFTA_Quadri.png",
                "Body":"https://cdn.discordapp.com/attachments/894224051571138560/1035463488509857812/tir_a_larc.jpg"},
            "Texte":{"Gauche":["La Fédération française de tir à l'arc (FFTA) est chargée d'organiser et de développer la pratique du tir à l'arc en France3. Elle regroupe l’ensemble des getCategorie faisant pratiquer le tir à l'arc et organise chaque année les championnats de France.",
                    "Elle est membre de la World Archery Federation (WA). Elle dépend aussi de la World Archery Europe (WAE), association continentale qui gère les compétitions au niveau européen.",
                    "Le 9 avril 1899, lors de la préparation des Jeux Olympiques de Paris en 1900, la Fédération des compagnies d'arc de l'Île-de-France voit le jour. Elle se renomme Fédérations des compagnies d'arc de France en 1911.",
                    "Elle prit définitivement le nom de Fédération française de tir à l'arc le 27 avril 1928"],
                "Droite":"En 1972, la fédération comptait 5 000 licenciés ce nombre monte à 40 000 licenciés en 1992, puis dépasse les 70 000 licenciés, le 19 février 2013 et atteint finalement 77 255 licenciés en 2019. En 2011, la fédération comptait 23 % de femmes, ce chiffre augmente à 29,2 % en 2019, à 31 % en 2021 et à 34% en 2022. "},
            "Initiation":"Nous vous proposons plusieurs petites initiations sur les bases du sport, de ses techniques",
            "Commentaires": [{"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}, {"Nom":"Patrick Durand", "Commentaire":"J'adore ce sport !", "Note": 9}]
        };
    }
    if (getClub){
        return callback(null, getClub)
    }else{
        return callback([])
    }
}

const getCategories = (type, callback) => {
    if (type === "restaurants"){
        return callback(null, "Restaurants");
    } else if (type === "clubs"){
        return callback(null, "Clubs");
    } else if (type === "vente"){
        return callback(null, "Vente");
    } else {
        return callback(null, [{"title": "Restaurants"}, {"title": "Clubs"}, {"title": "Vente"}]);
    }
}

const authenticate = (data,callback) => {
    let users = loadUsers()
    users = users.users;
    const user = users.find((u) => u.username.toLowerCase() === data.email.toLowerCase())
    if (user) {
        //TODO COMPARE PASSWORDS
        bcrypt.compare(data.password, user.password, (error, results) => {
            if (results){
                //Deux mots de passe sont pareils
                console.log(chalk.inverse.green("Success !"));
                return callback(null, user.email);
            }
            console.log("Votre mot de passe est incorrect !");
            return callback("Votre mot de passe est incorrect !");
        });
    } else {
        console.log('Utilisateur introuvable!')
        return callback('Utilisateur introuvable!');
    }
}

const getStands = async (callback) => {
    await pool.query(mapQueries.getStands, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}

const getAllStands = async (callback) => {
    await pool.query(mapQueries.getAllStands, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}

const loadUsers = () => {
    try {
        const dataBuffer = fs.readFileSync('users.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const getInscriptionChoix = async (callback) => {
    let res = {};
    await pool.query(signupQueries.getLangues, async (error, results) => {
        if (error) {
            console.log("error");
            return callback(error);
        } else if (results.rowCount === 0){
            console.log("No languages found");
            return callback("No languages found");
        } else {
            console.log('success');
            res.langues = results.rows;
            await pool.query(signupQueries.getAge, async (error, results) => {
                if (error) {
                    console.log("error");
                    return callback(error);
                } else if (results.rowCount === 0){
                    console.log("No years found");
                    return callback("No years found");
                } else {
                    console.log('success');
                    res.years = results.rows;
                    await pool.query(signupQueries.getSexe, async (error, results) => {
                        if (error) {
                            console.log("error");
                            return callback(error);
                        } else if (results.rowCount === 0){
                            console.log("No gender found");
                            return callback("No gender found");
                        } else {
                            console.log('success');
                            res.gender = results.rows;
                            await pool.query(signupQueries.getPays, async (error, results) => {
                                if (error) {
                                    console.log("error");
                                    return callback(error);
                                } else if (results.rowCount === 0){
                                    console.log("No country found");
                                    return callback("No country found");
                                } else {
                                    console.log('success');
                                    res.countries = results.rows;
                                    return callback(null, res);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

const getInscriptionChoixPrestataire = async (callback) => {
    await pool.query(signupQueries.getTypes, async (error, results) => {
        if (error) {
            console.log("error");
            return callback(error);
        } else if (results.rowCount === 0){
            console.log("No types found");
            return callback("No types found");
        } else {
            console.log('success');
            return callback(null, {type: results.rows})
        }
    });
}

const getContraintes = async callback => {
    await pool.query(mapQueries.getContraintes, (err, results) => {
        if(err) return callback(err)
        return callback(null, results.rows)
    })
}

const getContraintesByStand = async callback => {
    await pool.query(mapQueries.getContraintesByStand, (err, results) => {
        if(err) return callback(err)
        return callback(null, results.rows)
    })
}

const getDemandesPrestataires = async (callback) => {
    await pool.query(signupQueries.getDemandesPrestataires, async (error, results) => {
        if (error) {
            console.log("error getDemandesPrestataires");
            return callback(error);
        } else if (results.rowCount === 0){
            console.log('success getDemandesPrestataires');
            return callback(null, 0);
        } else {
            console.log('success getDemandesPrestataires');
            return callback(null, results.rows);
        }
    });
}

const postDemandesPrestataires = async (choice, id, callback) => {
    console.log(choice, id);
    if (choice === "accept" && id){
        await pool.query(signupQueries.postDemandesPrestatairesTrue, [id], async (error, results) => {
            if (error) {
                console.log("error postDemandesPrestatairesTrue");
                return callback(error);
            } else {
                console.log('success postDemandesPrestatairesTrue');
                return callback(null, "success");
            }
        });
    } else if (choice === "decline" && id){
        await pool.query(signupQueries.postDemandesPrestatairesFalse, [id], async (error, results) => {
            if (error) {
                console.log("error postDemandesPrestatairesFalse");
                return callback(error);
            } else {
                console.log('success postDemandesPrestatairesFalse');
                return callback(null, "success");
            }
        });
    } else {
        console.log("error postDemandesPrestatairesTrue");
        return callback("error postDemandesPrestatairesTrue");
    }

}

const getAllPrestataires = async (callback) => {
    await pool.query(mapQueries.getAllPrestataires, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}

const getTypeCaracteristiquesPresta = async (callback) => {
    await pool.query(mapQueries.getTypeCaracteristiquesPresta, ((error, results)=>{
        if (error)
            return callback(error)
        else{
            return callback(null, results.rows)
        }
    }))
}

// const getClassementCourse = async (idCourse, callback) => {
//     await pool.query(mapQueries.getClassementCourse, [idCourse], ((error, results)=>{
//
//         if (error) return callback(error)
//         else return callback(null, results.rows)
//     }));
// }

const getResultats = async (nomCompetition, callback) => {
    if (nomCompetition){
        let competition = null;
        if (nomCompetition === "courseapied") competition = "Course à pied";
        else if (nomCompetition === "vtt") competition = "Course de VTT";
        else if (nomCompetition === "natation") competition = "Course de natation";
        else if (nomCompetition === "courseorientation") competition = "Course d'orientation";
        else return callback("Competition not found");
        await pool.query(signupQueries.getResultats, [competition], ((error, results)=>{
            if (error)
                return callback(error)
            else{
                return callback(null, {name: competition ,data: results.rows})
            }
        }))
    } else {
        return callback("Competition not found");
    }
}

const getCompetition = async (callback) => {
    let filtres = []
    await pool.query(signupQueries.getKm, (async (error, results) => {
        if (error)
            return callback(error)
        else {
            let temp = []
            for (const elt of results.rows) {
                temp.push(Object.values(elt)[0]);
            }
            filtres.push([Object.keys(results.rows[0])[0], temp]);
            await pool.query(signupQueries.getPlace, (async (error, results) => {
                if (error)
                    return callback(error)
                else {
                    let temp = []
                    for (const elt of results.rows) {
                        temp.push(Object.values(elt)[0]);
                    }
                    filtres.push([Object.keys(results.rows[0])[0], temp]);
                    await pool.query(signupQueries.getPrix, (async (error, results) => {
                        if (error)
                            return callback(error)
                        else {
                            let temp = []
                            for (const elt of results.rows) {
                                temp.push(Object.values(elt)[0]);
                            }
                            filtres.push([Object.keys(results.rows[0])[0], temp]);
                            await pool.query(signupQueries.getType, (async (error, results) => {
                                if (error)
                                    return callback(error)
                                else {
                                    let temp = []
                                    for (const elt of results.rows) {
                                        temp.push(Object.values(elt)[0]);
                                    }
                                    filtres.push([Object.keys(results.rows[0])[0], temp]);
                                    await pool.query(signupQueries.getLieu, (async (error, results) => {
                                        if (error)
                                            return callback(error)
                                        else {
                                            let temp = []
                                            for (const elt of results.rows) {
                                                temp.push(Object.values(elt)[0]);
                                            }
                                            filtres.push([Object.keys(results.rows[0])[0], temp]);
                                            await pool.query(signupQueries.getCompetition, ((error, results) => {
                                                if (error)
                                                    return callback(error)
                                                else {
                                                    let temp = []
                                                    for (const elt of results.rows) {
                                                        let object = {title: elt.title}
                                                        delete elt.title;
                                                        object.filtres = { title: Object.keys(elt), body: Object.values(elt)}
                                                        temp.push(object);
                                                    }
                                                    return callback(null, {title: "Compétitions", getFiltres: filtres, getCards: temp})
                                                }
                                            }))
                                        }
                                    }))
                                }
                            }))
                        }
                    }))
                }
            }))
        }
    }))
    //return callback(null, {title: "Compétitions", filtres: results.rows})
}

module.exports = {
    getOrganisateur,
    getCagnotte : getCagnotte,
    getSexe : getSexe,
    getCourses: getCourses,
    getFiltresCourses: getFiltresCourses,
    authenticate: authenticate,
    getClub: getClub,
    getFiltres: getFiltres,
    getPrestataire: getPrestataire,
    getCategories: getCategories,
    getStands: getStands,
    getInscriptionChoix,
    getContraintes: getContraintes,
    getContraintesByStand: getContraintesByStand,
    getInscriptionChoixPrestataire,
    getDemandesPrestataires,
    postDemandesPrestataires,
    getInscriptionChoixPrestataire,
    getAllStands,
    getAllPrestataires,
    getTypeCaracteristiquesPresta,
    getResultats,
    getCompetition,
    //getClassementCourse,
    getResultats
}
