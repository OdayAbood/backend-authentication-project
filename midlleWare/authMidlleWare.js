const jwt = require("jsonwebtoken");

const User = require("../models/userModel")

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt ; 
    if(token){
        // console.log(token);
        jwt.verify(token , " " , (err , decodeToken)=>{
            if(err){
                console.log(err.message);
                res.redirect("/signin");
            }
            else{
                // console.log(decodeToken);
                next();
            }
        })
    }
    else {
        res.redirect("/signin");
    }
}

const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token , " " , async (eror,decodeToken)=>{
            if(eror){
                res.locals.user = null
                console.log(eror);
                next();
            }
            else{
                res.locals.user = await User.findById(decodeToken.id);
                next();
            }
        })
    }
    else {
        res.locals.user = null
        next();
    }
}

module.exports = {requireAuth , checkUser};