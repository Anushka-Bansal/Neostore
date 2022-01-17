const express= require('express');
const routes= express.Router();

const products = require('../Controllers/productControllers');

routes.post("/add-product",products.addProduct);
routes.get("/get-product",products.getProduct);
routes.get("/product-details/:id",products.getProductDetails);

routes.post("/add-color",products.addColor);
routes.get("/color/:id",products.getColor);
routes.get("/all-colors",products.getAllColor);

routes.post("/add-category",products.addCategory);
routes.get("/all-category",products.getAllCategory);

routes.post("/cart-items/:email",products.myCart);



module.exports = routes;