/* 
    Author: Martin Adrían Balmaceda  
    proyect: Test Mercado Libre
    year: 2019
*/

const Request 	= require("request");
const configApp = require('../../config/config');

var ControllerProducts = {};

/*--------------------- VIEWS -------------------------*/

ControllerProducts.getItems = function (req,res) {
    var query = req.query.search;
    const url = configApp.ep_search + query;

    Request.get(url, (error, response, body) => {
        if(error) return res.render('items', {nofound:"Error al intentar conectarse al servidor remoto."});
        var resultado = JSON.parse(body);
        var total =  resultado.paging.total;
        if(total==0) return res.render('items', {nofound:"No se encontraron resultados para su búsqueda."});
        if(total > 0 && total <= 4) res.render('items',resultado);
        
        var aux = new Array();
        for (let index = 0; index < 4; index++) aux.push(resultado.results[index]);
        resultado.results = aux;

        return res.render('items',formatItems(resultado));
    });
}

ControllerProducts.getItem = function (req,res) {
    var id = req.params.id;

    //urls
    const url1 = configApp.ep_product +"/" + id, 
        url2 = configApp.ep_product +"/"+ id + "/" + "description";
    
    Request.get(url1, (error, response, body) => {
            if(error) return res.render('items', {nofound:"Error al intentar conectarse al servidor remoto."});
            var item = JSON.parse(body);
            //defino atributos necesarios
            Request.get(url2, (error, response, body) => {
                if(error) res.render('items', {nofound:"Error al intentar conectarse al servidor remoto."});
                var description = JSON.parse(body);
                return res.render('item',formatItem(item,description));
            });
    });
}

//genero un modelo dinámico del objeto
/*-------------------------------------------------------
-----------------FORMATO DE OBJETOS----------------------
--------------------------------------------------------*/

//formateo los objetos de acuerdo a lo pedido en la consigna
formatItems = function (list) {
    var formatedList = {};
    formatedList.author = {name: "Martin",lastname:"Balmaceda"};   
    formatedList.categories =new Array();
    formatedList.items = new Array();
     
    //categorías
    list.filters.forEach(filter => {
        filter.values.forEach(subfilter => {
            if(subfilter.path_from_root){
                subfilter.path_from_root.forEach(subsubfilter => {
                    formatedList.categories.push(subsubfilter.name);
                });
            } else {
                formatedList.categories.push(subfilter.name);  
            }
           
        });
    });

    //formateo el resultado
    list.results.forEach(item => {
        var newItem = {
            id: item.id,       
            title: item.title,
            price:{         
                currency: item.currency_id,         
                amount:Intl.NumberFormat("es-AR").format(Math.trunc(item.price)).replace(",","."),
                decimals: (item.price - Math.floor(item.price)).toPrecision(2).toString().replace("0.","")
            },      
            picture: item.thumbnail,       
            condition: item.condition,       
            free_shipping: item.shipping.free_shipping, 
            //Agregado por que en la imágen se solicita la direción pero no figura en el pedido de formateo del objeto del enunciado  
            address: item.address.state_name,
            
        }
        formatedList.items.push(newItem);  
    });

    return formatedList;
}

//formateo el objeto de acuerdo a lo pedido en la consigna
formatItem = function (item,description) {
var newItem = {
    author:{
        name: "Martin",
        lastname: "Balmaceda",
    },
    item:{
        id: item.id,       
        title: item.title,
        price:{         
            currency: item.currency_id,         
            amount:Intl.NumberFormat("es-AR").format(Math.trunc(item.price)).replace(",","."),
            decimals: (item.price - Math.floor(item.price)).toPrecision(2).toString().replace("0.","")
        }      
    },
    picture: item.pictures[0].secure_url,       
    condition: item.condition == "new" ? "Nuevo": "Usado",       
    free_shipping: item.shipping.free_shipping, 
    sold_quantity: item.sold_quantity,
    description: description.plain_text
    }
    return newItem;
}

module.exports = ControllerProducts;