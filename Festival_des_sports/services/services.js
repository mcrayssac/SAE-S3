const fs = require('fs');
const chalk = require('chalk');

const getCagnotte = (callback) => {
    let cagnotte = 2000000;
    let objectif = 4000000;
    let pourcentage = cagnotte/objectif*100;
    //return callback([])
    return callback(null, {cagnotte : cagnotte, objectif : objectif, pourcentage : pourcentage});
}

module.exports = {
    getCagnotte : getCagnotte
}
