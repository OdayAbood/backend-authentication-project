const  User  = require("../models/userModel");
const jwt = require("jsonwebtoken");

const handleErrors = (req , res , err)=>{
    let errors = {email : "" , password : "" , firstname:"" , lastname:"" , eror : false};
    if(err._message){
        errors.eror = true;
        Object.values(err.errors).forEach(err => {
            errors[err.properties.path] = err.properties.message ; 
    }
)
}
console.log(err);
res.status(500).json((errors));
}
const maxAge = 3 * 24 * 60 * 60 ;
const createUserWebToken = (id) => {
    return jwt.sign({id} , " " , {expiresIn : maxAge})
}

const signup_get = (req,res)=>{ 
    res.render("signUp");
    console.log("sinup get reques" , req.path)
} ;

const signin_get = (req,res)=>{ 
    res.render("signIn");
    console.log("sinin get reques" , req.path);
} ;

const smoothe_get = (req,res)=>{ 
    console.log("hello from the smoothe page" , req.path);
    res.render("smoothe")} ;

const signup_post = async (req,res)=>{
    console.log("signup post request" , req.path);
    const {first , last ,email , password} = req.body;
    const userEmail = await User.findOne({email}) ;
    if(!userEmail){
        const user = new User(req.body);
        user.save()
        .then(()=>{
            const token = createUserWebToken(user._id);
            res.cookie('jwt' , token , {httpOnly:true , maxAge : maxAge *1000});
            console.log("saved");
            res.json({redirect : "/"});
        })
        .catch(err=> {
            handleErrors(req , res , err);
        });
    }
    else{
        res.status(500).json({emailExist : " This email is alredy exist. go and login"});
    }
}

const signin_post = async (req,res) =>{
    console.log("signin post req" , req.path) ;
    const {email , password} = req.body ;
    const emailExist = await User.findOne({email});
    
    if(emailExist){
            if(password === emailExist.password){
                const token = createUserWebToken(emailExist._id);
                res.cookie("jwt" , token , {httpOnly:true , maxAge : maxAge * 1000})
                res.json({redirect : "/"})
            }
            else  {
                res.json({passwordFaild : "Please enter a valid password"})
            }
        }
        else{
            res.json({notExist : "This email is not exist. Go and sign up"})
        }
}

const logout_get = (req,res)=>{
    res.cookie('jwt' , '' ,{ maxAge: 1});
    res.redirect("/")
    console.log("log out correctly" , req.path);
}
module.exports = {smoothe_get , signin_get , signup_get , signup_post , signin_post , logout_get}