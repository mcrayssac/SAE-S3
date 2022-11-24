const express = require("express");
const hbsEngine = require("express-handlebars");
const chalk = require("chalk");
const app = express();
const dotEnv = require("dotenv");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");

//Configuration de l'environement/PORT
dotEnv.config();
const port = process.env.PORT;

//Défini l'emplacement du CSS, IMG, JS
app.use(express.static(__dirname + "/public"));

//Défini le moteur de vue
app.engine('hbs', hbsEngine.engine({
    //Route au layout
    layoutsDir: './views/layouts',
    defaultLayout: 'mainHome',
    extname: '.hbs'
}));
app.set("view engine", 'hbs');

var hbs = hbsEngine.create({});

hbs.handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

hbs.handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    /*console.log("IP : " + JSON.stringify(req.ip));
    console.log("Browser : " + req.headers["user-agent"]);
    console.log("Language : " + req.headers["accept-language"]);*/
    //Permet de pas bloquer le site en utilisant next
    next();
});

app.use("/", routes);

app.get("/", (req, res) => {
    res.redirect("/home");
});

//Si chemin n'est pas dans les fonctions d'avant
app.use("*", (req, res, next) => {
    const err = new Error("Not found !");
    err.status = 404;
    next(err);
});
//On affiche l'erreur 404 : Not found !
app.use((err, req, res, next) => {
    //console.error(chalk.inverse.grey.bgRed.bold(err.stack));
    res.render("error404.hbs");
});

//Pour connaître le port
app.listen(port, () => {
    console.log(chalk.inverse.black.bold.bgGreen(` Bienvenue, l'application écoute sur le port ${port}. `));
});