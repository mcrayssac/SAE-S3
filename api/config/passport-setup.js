const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const pool = require('../database/db');
const chalk = require("chalk");
const services = require('../../auth_api/services/authentification_services.js');

passport.use(
    new GoogleStrategy({
        // options for google strategy
        callbackURL: 'http://localhost:3000/api/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, async (accessToken, refreshToken, profile, done) => {
        let form = {
            accessToken,
            refreshToken,
            profile
        }
        await services.create(form, 'google', (err, user) => {
            if (err) {
                console.log(err);
            } else {
                done(null, user);
            }
        });
    })
);
passport.serializeUser((user, done) => {
    done(null, user);
    console.log('Serializing user with ID : ', user.id);
});

passport.deserializeUser((user, done) => {
    console.log('Deserializing user with id:', user.id);
    done(null, user);
});
