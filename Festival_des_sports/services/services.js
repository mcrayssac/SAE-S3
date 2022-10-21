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

const getFiltres = (type, callback) => {
    let getFiltres = null;
    if (type === "restaurants"){
        getFiltres = {"Spécialites":["Nuggets", "Burger"],
            "Places":["200 places", "100 places", "50 places", "10 places"]
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
    getFiltres : getFiltres,
    getRestaurants : getRestaurants
}
