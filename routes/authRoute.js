const express = require('express');

const { requireAuth ,checkUser } = require("../midlleWare/authMidlleWare");

const authControler = require('../controllers/authControler');

const Router = express.Router();

Router.get("/signup" , checkUser ,authControler.signup_get );
Router.get("/signin" , checkUser   ,authControler.signin_get);
Router.get("/smoothe", checkUser  ,requireAuth , authControler.smoothe_get);
Router.post("/signup" , checkUser , authControler.signup_post);
Router.post("/signin" , checkUser ,authControler.signin_post);
Router.get("/logout" , checkUser , authControler.logout_get);

module.exports = Router;