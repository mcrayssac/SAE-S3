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
    let resCourse = [{"nom": "Course 1", "sport": "Course d'orientation", "distance": "12 km", "prix": "5€", "places": "200", "lieu": "Départ course à pied", "image":"https://www.astucedegrandmere.com/wp-content/uploads/Course-%C3%A0-pieds-les-astuces-pour-sy-mettre-300x300.jpg"},
                    {"nom": "Course 2", "sport": "Course de natation", "distance": "8 km", "prix": "7€", "places": "58", "lieu": "Départ au lac","image": "https://contents.mediadecathlon.com/p1265270/k$6ddc26c476bbb8357c54f40477eebe83/800x0/3228pt2061/4303xcr4303/entrainement-pour-eau-libre.jpg?format=auto&quality=80"}
                    ]
    if (resCourse.length > 0){
        return callback(null, resCourse)
    }else{
        return callback([])
    }
}

module.exports = {
    getCagnotte : getCagnotte,
    getSexe : getSexe,
    getCourses: getCourses
}
