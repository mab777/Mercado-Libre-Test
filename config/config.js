/* 
    Author: Martin Adrían Balmaceda  
    proyect: Test Mercado Libre
    year: 2019
*/

module.exports = {
    name: "/api",
    port: process.env.PORT || 3001,
    baseUrl: __dirname.replace('\config',''),
    ep_search: "https://api.mercadolibre.com/sites/MLA/search?q=",
    ep_product: "https://api.mercadolibre.com/items",
};
