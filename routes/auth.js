var express = require("express");
var router   = express.Router();
var users   = require("../models/users");
var passport = require("passport");

//come here after logout
router.get("/",function(req,res){
    res.render("landingpage");
});


router.get("/signup",function(req,res){
    res.render("signup");
});


router.post("/signup",function(req,res){
   
     users.register(new users(
         {
             firstname:req.body.firstname,
             lastname:req.body.lastname,
            //  bdate:req.body.body.bdate,
             email:req.body.email,
             username:req.body.username
     }),req.body.password,function(err,user){
        if(err){
            console.log("ERROR");
            res.render("signup");
        }

        passport.authenticate("local")(req,res, function(){
            res.redirect("/payingguests");
        });
    });
});

router.get("/signin",function(req,res){
    res.render("signin");
});

router.post("/signin",passport.authenticate( "local", { 
        successRedirect:"/payingguests",failureRedirect:"/signin"
    }) ,function(req,res){
});

router.get("/signout",function(req,res){
    req.logout(); // passport is destroying user data in session, not keeping track of user data in session
    res.redirect("/");
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
}

module.exports = router;