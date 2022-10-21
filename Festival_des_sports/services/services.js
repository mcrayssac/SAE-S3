const fs = require('fs');
const chalk = require('chalk');

const getCagnotte = (callback) => {
    let cagnotte = 3000000;
    let objectif = 4000000;
    let pourcentage = cagnotte/objectif*100;
    if (cagnotte && objectif && pourcentage){
        return callback(null, {cagnotte : cagnotte, objectif : objectif, pourcentage : pourcentage});
    }else{
        return callback({cagnotte : "0", objectif : "0", pourcentage : "0"});
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
    /*let resCourse = [{"nom": "Course 1", "sport": "Course d'orientation", "distance": "12 km", "prix": "5€", "places": "200", "lieu": "Départ course à pied", "image":"https://www.astucedegrandmere.com/wp-content/uploads/Course-%C3%A0-pieds-les-astuces-pour-sy-mettre-300x300.jpg"},
                    {"nom": "Course 2", "sport": "Course de natation", "distance": "8 km", "prix": "7€", "places": "58", "lieu": "Départ au lac","image": "https://contents.mediadecathlon.com/p1265270/k$6ddc26c476bbb8357c54f40477eebe83/800x0/3228pt2061/4303xcr4303/entrainement-pour-eau-libre.jpg?format=auto&quality=80"}
                    ]*/
    let resCourses =    [
                        ["ORIENTATION", {"Sport":" Running", "Distance": "12 km", "Age":" 18 à 25 ans", "Prix": "5€", "Places": "200", "Lieu": "Départ course à pied"},{ "image":"https://www.ffcorientation.fr/media/cms_page_media/16/CO%20%C3%A0%20pied%202_w9ML6Pb.jpg"}],
                        ["NATATION",    {"Sport":" Sports d'eau", "Distance": "8 km", "Age":" 18 à 25 ans", "Prix": "7€", "Places": "58", "Lieu": "Départ au lac"},{"image": "https://contents.mediadecathlon.com/p1265270/k$6ddc26c476bbb8357c54f40477eebe83/800x0/3228pt2061/4303xcr4303/entrainement-pour-eau-libre.jpg?format=auto&quality=80"}],
                        ["A PIED",      {"Sport":" Running", "Distance": "10 km", "Age":" 12 à 27 ans",  "Prix": "10€", "Places": "74", "Lieu": "Départ course à pied"},{"image": "https://www.astucedegrandmere.com/wp-content/uploads/Course-%C3%A0-pieds-les-astuces-pour-sy-mettre-300x300.jpg"}],
                        ["VTT",         {"Sport":" Vélo", "Distance": "36 km", "Age":" 12 à 17 ans", "Prix": "11€", "Places": "14", "Lieu": "Départ à l'entrée"},{"image": "https://img.redbull.com/images/c_crop,x_1693,y_0,h_3525,w_2643/c_fill,w_400,h_540/q_auto:low,f_auto/redbullcom/2017/10/13/9f7e9e7f-4997-4f81-a578-88b3c4f7d795/mass-start-vtt-course-red-bull-foxhunt"}],
                        ["VTT",         {"Sport":" Vélo", "Distance": "45 km", "Age":" 12 à 17 ans", "Prix": "11€", "Places": "47", "Lieu": "Départ à l'entrée"},{"image": "https://img.redbull.com/images/c_crop,x_765,y_0,h_3563,w_2672/c_fill,w_400,h_540/q_auto:low,f_auto/redbullcom/2020/12/3/soj4jzfy69ph4vynscmv/tom-pidcock-mondiaux-vtt-xc-leogang-2020"}],
                        ["ESCALADE",    {"Sport":" Escalade", "Hauteur": "15 m", "Age":" 26 et +", "Prix": "13€", "Places": "7", "Lieu": "Départ à l'entrée"},{"image": "https://www.vertical-art.fr/wp-content/uploads/2022/09/Janja-garnbret-Coupe-du-monde-Jakarta-2022.jpg"}],
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
        getFiltres = {"Spécialites":[" Nuggets", " Burger"],
            "Places":[" 200 places", " 100 places", " 50 places", " 10 places"]
        };
    }
    if (getFiltres){
        return callback(null, getFiltres)
    }else{
        return callback([])
    }
}

const getRestaurants = (callback) => {
    let getRestaurants = [
        ["Mcdo", {"Spécialites":"Nuggets", "Places":"200 places"}],
        ["Burger King",{"Spécialites":"Burger", "Places":"100 places"}],
        ["Mcdo",{"Spécialites":"Nuggets", "Places":"50 places"}],
        ["Mcdo",{"Spécialites":"Nuggets", "Places":"50 places"}],
        ["Mcdo",{"Spécialites":"Nuggets", "Places":"50 places"}],
        ["Burger King",{"Spécialites":"Burger", "Places":"10 places"}]
    ];
    if (getRestaurants.length > 0){
        return callback(null, getRestaurants)
    }else{
        return callback([])
    }
}

module.exports = {
    getCagnotte : getCagnotte,
    getSexe : getSexe,
    getCourses: getCourses,
    getFiltres : getFiltres,
    getRestaurants : getRestaurants,
    getFiltresCourses: getFiltresCourses
}
