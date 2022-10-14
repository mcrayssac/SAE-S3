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

module.exports = {
    getCagnotte : getCagnotte
}
