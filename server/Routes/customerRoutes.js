const express= require('express');
const routes= express.Router();
const details= require('../Controllers/customerControllers')

routes.post("/register",details.register)
routes.post("/social-register",details.socialRegister)
routes.post("/login",details.login)
routes.post("/social-login",details.socialLogin)
routes.post("/email-send",details.emailSend)
routes.post("/verify-otp",details.verifyOtp)
routes.post("/forgot-password",details.forgotPassword)

module.exports = routes;