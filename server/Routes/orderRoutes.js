const express= require('express');
const routes= express.Router();
const orders = require('../Controllers/OrderControllers');
const {autenticateToken} = require('../Middleware/TokenMiddleware');

routes.post("/checkout",autenticateToken,orders.checkOut);
routes.get("/order-details/:email",autenticateToken,orders.getOrderDetails);
routes.get("/invoice/:id",orders.getInvoice);

module.exports = routes;