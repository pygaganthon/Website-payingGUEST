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
            
            req.flash("error","Invalid Credentials! Please try again.");
            return res.render("signup");
        }

        passport.authenticate("local")(req,res, function(){
            
                    req.flash("success","Welcome to payingGUEST "+user.firstname+" !");
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
    req.flash("success","Successfully SignedOut!");
    req.logout(); // passport is destroying user data in session, not keeping track of user data in session
    res.redirect("/");
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    //req.flash("error","Please SignIn first!");
    res.redirect("/signin");
}

module.exports = router;