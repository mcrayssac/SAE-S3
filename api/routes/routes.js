const express = require("express");
const controller = require("../controllers/controllers");

//Import module de session et cookies
const expressSession = require("express-session");
    cookieParser = require("cookie-parser");

var router = express.Router();

/*//Recommander de ne pas afficher la clé secrete secret_passcode
router.use(cookieParser("secret_passcode"))

//Déterminer une durée de session
const unJour = 1000 * 60 * 60 * 24 //milliseconde
//AJoute au routeur middleware de session
router.use(
    expressSession({
        secret: "secret_passcode", //Clé privée
        cookie: {maxAge: unJour}, resave: true, saveUninitialized: true
    })
);*/

//...



const jwt = require('jsonwebtoken');
const user = {id: 42, name: "max", email:"max@gmail.com", password: 'max', admin: true}
function generateAccessToken (user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '600s'});
}
function generateRefreshToken (user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1800s'});
}
router.post('/api/login', (req, res) => {
    //TODO: Check le user en BDD
    if (req.body.email !== user.email) {
        res.status(401).send('invalid credentials');
        return;
    }
    if (req.body.password !== user.password) {
        res.status(401).send('invalid credentials');
        return;
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.send({
        id: user.id,
        accessToken,
        //refreshToken
    })
})
router.post('/api/refreshToken', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token){
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        //TODO: Check en BDD qu'il existe toujours
        delete user.iat;
        delete user.exp;
        const refreshedToken = generateAccessToken(user);
        res.send({
            accessToken: refreshedToken
        });
    })
})
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token){
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    })
}
router.get('/api/me', authenticateToken, (req, res) => {
    res.send(req.user);
})
router.get('/api/create', (req, res) => {
    if (req.body.email && req.body.password) {
        res.send(user);
        return;
    }
    res.status(401).send('invalid credentials');
})



// --------- LOGIN
router.get("/login/:email/:password", controller.authenticateUser);

router.get("/check/login", controller.login);


// --------- PUBLIC
router.get("/categories/:nomCategorie", controller.getCategorie);

router.get("/categories", controller.getCategories);

router.get("/prestataires/:nomPrestataire", controller.getPrestataire);


// --------- PRESTATAIRE


module.exports = router;
