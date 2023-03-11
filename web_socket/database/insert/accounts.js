const csvFilePathPrestataire = '../BDD/PRESTATAIRE.csv';
const csvFilePathPublic = '../BDD/PUBLIC.csv';
const csvFilePathOrga = '../BDD/ORGANISATEUR.csv';
const csv = require('csvtojson');
let result = null;

db.accounts.deleteMany({});

const importCsv = async (csvFilePath, admin) => {
    csv({
        noheader: true,
        headers: ['nom']
    })
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            let id = 1;
            result = jsonObj.map((row) => {
                return {
                    id: id++,
                    nom: row['nom'],
                    admin,
                };
            });
            return result;
        })
        .then((result) => {
            db.accounts.insertMany(result);
        })
        .catch((err) => {
            console.log('Error importing CSV: ', err);
        });
}

importCsv(csvFilePathPrestataire, 'prestataire')
    .then(() => {
        importCsv(csvFilePathPublic, null)
            .then(() => {
                importCsv(csvFilePathOrga, 'organisateur')
                    .then(() => {
                        console.log('All csv imported')
                    })
            })
    })