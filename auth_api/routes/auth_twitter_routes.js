const express = require("express");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const jwt = require("jsonwebtoken");
const Twit = require("twit");
const cors = require("cors");
const dotEnv = require("dotenv");
dotEnv.config();

//Define express router
let router = express.Router();

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;


passport.use(
    new TwitterStrategy(
        {
            consumerKey: TWITTER_CONSUMER_KEY,
            consumerSecret: TWITTER_CONSUMER_SECRET,
            callbackURL: "http://localhost:3003/auth/twitter/callback",
        },
        async (token, tokenSecret, profile, done) => {
            profile.token = token;
            profile.tokenSecret = tokenSecret;
            done(null, profile);
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

router.use(cors());
router.use(passport.initialize());
router.use(passport.session());

router.get("/twitter", async (req, res, next) => {
    passport.authenticate("twitter", (err, url) => {
        if (err) {
            return next(err);
        }

        res.json({ url });
    })(req, res, next);
});

router.get(
    "/twitter/callback",
    passport.authenticate("twitter", { session: false }),
    (req, res) => {
        const payload = {
            id: req.user.id,
            displayName: req.user.displayName,
            username: req.user.username,
            token: req.user.token,
            tokenSecret: req.user.tokenSecret,
        };

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.send(`
      <script>
        window.opener.postMessage("${token}", "http://localhost:8080");
        window.close();
      </script>
    `);
    }
);

function isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    //console.log("authHeader: ", authHeader);

    if (authHeader) {
        let tabAuthHeader = authHeader.split(" ");
        let token = authHeader.split(" ")[tabAuthHeader.length-1];
        console.log("token: ", token);
        //console.log(authHeader.split(" "));
        if (token === "Bearer"){
            token = authHeader.split(" ")[2];
        }

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = {
                id: user.id,
                displayName: user.displayName,
                username: user.username,
                token: user.token,
                tokenSecret: user.tokenSecret,
            };
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

router.get("/user", isAuthenticated, async (req, res) => {
    const T = new Twit({
        consumer_key: TWITTER_CONSUMER_KEY,
        consumer_secret: TWITTER_CONSUMER_SECRET,
        access_token: req.user.token,
        access_token_secret: req.user.tokenSecret,
        timeout_ms: 60 * 1000,
    });

    try {
        const response = await T.get("account/verify_credentials");
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch user information" });
    }
});

module.exports = router;