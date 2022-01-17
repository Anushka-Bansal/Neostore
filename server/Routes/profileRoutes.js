const express= require('express');
const routes= express.Router();
const accountDetails = require('../Controllers/profileController');
const {autenticateToken} = require('../Middleware/TokenMiddleware');

routes.put("/edit-profile/:email",autenticateToken, accountDetails.updateUser);
routes.get("/get-user/:email",autenticateToken,accountDetails.getUser);

routes.post("/change-password/:email",autenticateToken,accountDetails.changePassword);

routes.post("/add-address/:email",autenticateToken,accountDetails.addAddress);
routes.put("/edit-address/:email",autenticateToken,accountDetails.editAddress);

module.exports = routes;