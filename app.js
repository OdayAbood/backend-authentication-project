const express = require("express");

const User = require("./models/userModel");

const {checkUser} = require("./midlleWare/authMidlleWare");

const authRoute = require('./routes/authRoute')

const app = express();

const mongoose = require('mongoose');

const cookieParser = require("cookie-parser");

mongoose.connect('mongodb://localhost:27017/userStore' , 
    {useNewUrlParser : true , useUnifiedTopology: true}
)
.then(result =>{
    console.log("connected to the db");
    app.listen(3000,()=>{
    console.log("app listen correctly");
});
})
.catch(err =>{console.log(err)})


app.set('view engine' , 'ejs');

// app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded());

app.use(cookieParser());

// app.get("*" , checkUser);

app.get("/" , checkUser , (req,res)=>{
    console.log("hello from the home page" , req.path)
    res.render("home");
})



app.use(authRoute);




