/* 
    Author: Martin Adrían Balmaceda  
    proyect: Test Mercado Libre
    year: 2019
*/

//import node modules
const express = require('express');
const bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
const path = require('path');
const configApp = require('./config/config.js')

//definicion de la constante express
const app = express();
const router = require('./app/router/index');

//use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Para que los archivos publicos queden disponibles.
var publicPath = path.resolve(configApp.baseUrl, 'views'); 
app.use(express.static(publicPath));

// routes ======================================================================
app.use(configApp.name,router);

app.listen(configApp.port, () => {
    console.log(`corriendo puerto: ${configApp.port}`);
});

