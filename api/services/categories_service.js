const pool = require("../database/db");
const signupQueries = require("../queries/categories_queries");
const {popArray} = require("../security/methods")


const getCategorie = async (_type, callback) => {
    let type = popArray(_type)
    if (type){
        let filtres = [];
        let cards = [];
        await pool.query(signupQueries.getFamille, [type], async (error, results) => {
            if (error) {
                console.log("error");
                return callback(error);
            } else {
                console.log('success');
                let keys = [];
                for await (const elt of results.rows){
                    if (keys.includes(elt.Famille)){
                        filtres[keys.indexOf(elt.Famille)][1].push(elt.Filtre);
                    } else {
                        filtres.push([elt.Famille, [elt.Filtre]]);
                        keys.push(elt.Famille);
                    }
                }
                //console.log("Filtres : ", filtres);
                await pool.query(signupQueries.getPrestataires, [type], async (error, results) => {
                    if (error) {
                        console.log("error");
                        return callback(error);
                    } else {
                        console.log('success');
                        let keys = [];
                        let famille = [];
                        for await (const elt of results.rows){
                            if (keys.includes(elt.Title) && !famille.includes({title: elt.Title, famille: elt.Famille})){
                                cards[keys.indexOf(elt.Title)].filtres.title.push(elt.Famille);
                                cards[keys.indexOf(elt.Title)].filtres.body.push(elt.Filtre);
                                famille.push({title: elt.Title, famille: elt.Famille});
                            } else {
                                cards.push({title: elt.Title, urlImage: elt.UrlImage, id: elt.id, Site: elt.Site, filtres: { title: [elt.Famille], body: [elt.Filtre]}});
                                keys.push(elt.Title);
                                famille.push({title: elt.Title, famille: elt.Famille});
                            }
                        }
                        console.log("Cards : ", cards);
                        return callback(null, {title: type, getFiltres: filtres, getCards: cards});
                    }
                });
            }
        });
    }
}



const getCategories = (_type, callback) => {
    let type = popArray(_type)
    if (type === "restaurants"){
        return callback(null, "Restaurant");
    } else if (type === "clubs"){
        return callback(null, "Club");
    } else if (type === "vente"){
        return callback(null, "Magasin");
    } else {
        return callback(null, [{"title": "Restaurant"}, {"title": "Club"}, {"title": "Magasin"}]);
    }
}

module.exports = {
    getCategories,
    getCategorie
}
