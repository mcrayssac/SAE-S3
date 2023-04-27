const NodeCache = require("node-cache");
const chalk = require("chalk");
const cache = new NodeCache();

const cacheMiddleware = duration => (req, res, next) => {
    if(req.method !== "GET"){
        console.log("Impossible de mettre en cache une requête qui n'est pas un GET");
        return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if(cachedResponse){
        console.error(chalk.bgCyanBright(`Réponse mise en cache pour ${key}!`));
        return res.send(cachedResponse);
    } else {
        console.log(chalk.bgGray(`Pas de réponse mise en cache pour ${key}!`));
        res.originalSend = res.send;
        res.send = body => {
            res.originalSend(body);
            cache.set(key, body, duration);
        };
        next();
    }
}

module.exports = cacheMiddleware;
