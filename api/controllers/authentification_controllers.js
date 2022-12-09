const chalk = require("chalk");
const chalkController = chalk.inverse.blue.bold.bgWhite("[Controllers][Authentification]");

//Define users
const jwt = require("jsonwebtoken");
const user = {id: 42, name: "max", email:"max@gmail.com", password: 'max', admin: true}

//Function to access token generate
async function generateAccessToken (user) {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Access token generation.`));
    return await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '600s'});
}

//Function to user authenticate
exports.authenticateToken = async function (req, res, next){
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} User authentification belongs to a token.`));
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token){
        return res.sendStatus(401);
    }
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    })
}

exports.login = async (req, res) => {
    //TODO: Check dans BDD user
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Login user request received.`));
    if (req.body.email !== user.email) {
        res.status(401).send('invalid credentials');
        return;
    }
    if (req.body.password !== user.password) {
        res.status(401).send('invalid credentials');
        return;
    }
    const accessToken = await generateAccessToken(user);
    res.send({
        id: user.id,
        name: user.name,
        accessToken
    })
}

exports.user = async (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} User request received.`));
    await res.send(req.user);
}

exports.create = async (req, res) => {
    console.log(chalk.inverse.black.bold.bgWhite(`${chalkController} Create user request received.`));
    if (req.body.email && req.body.password) {
        await res.send(user);
        return;
    }
    await res.status(401).send('invalid credentials');
}