const express = require("express");
const controller = require("../controllers/authentification_controllers");
const passport = require('passport');
const auth_controller = require('../../auth_api/controllers/authentification_controllers');
const url = require("url");
const cacheMiddlewares = require("../cache/cache_middleware");
const services = require('../services/authentification_services');
const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        // You can add more data as needed
    };

    const secret = "your_jwt_secret"; // Use a more secure secret in production
    const options = {
        expiresIn: "1h", // Set the token expiration time as desired
    };

    return jwt.sign(payload, secret, options);
}


//Define express router
let router = express.Router();

//Routes d'authentification
router.post('/login',cacheMiddlewares(200), controller.login);

router.post('/user', cacheMiddlewares(200), controller.user);

router.post('/check/email/public', cacheMiddlewares(200), controller.checkEmailPublic);

router.post('/check/email/prestataire', cacheMiddlewares(200), controller.checkEmailPrestataire);

router.post('/user/create', cacheMiddlewares(200), controller.create);

router.delete('/user/delete/:id', cacheMiddlewares(200), controller.userDelete);

//google
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'https://www.googleapis.com/auth/userinfo.email'],
}))


// callback route
router.get("/auth/google/redirect",passport.authenticate("google"), async (req, res) => {
        //res.redirect("http://localhost:8080")
        const redirectUrl = url.format({
            protocol: 'http',
            hostname: 'localhost',
            port: 8080,
        });

        console.log('Redirect URL:', redirectUrl);
        res.redirect(redirectUrl);
    }
);


module.exports = router;