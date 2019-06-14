/* 
    Author: Martin Adrían Balmaceda  
    proyect: Test Mercado Libre
    year: 2019
*/

//import node modules
const express = require('express');
var Request 	= require("request");
const configApp = require('../../config/config');

//router 
const router = express.Router();
const controllerProducts = require('../controller/products')

// VIEWS 
//caja de busqueda
router.get('/', function (req, res) {
    res.render('index');
});

router.get('/index', function (req, res) {
    res.render('index');
});

//Resultado de la busqueda
router.get('/items', function (req, res) {
    controllerProducts.getItems(req,res)
});


//Detalle del producto
router.get('/items/:id', function (req, res) {
    controllerProducts.getItem(req,res)
});

module.exports = router;
