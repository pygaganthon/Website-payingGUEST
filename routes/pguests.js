var express = require("express");
var router   = express.Router();
var Homes   = require("../models/homes");
var passport = require("passport");
 // INDEX: view the list of homes
router.get("/payingguests",function(req,res){
    // console.log(req.user);   //req.user is from passport
    Homes.find({},function(err,pghomes){
        if(err){
        console.log("We found an error: ");
        console.log(err); 
    }
    else{
        res.render("payingguests",{pginfo:pghomes, curruser:req.user});
    }
    });
    
});

// CREATE: add homes to db
router.post("/payingguests",function(req,res){
    // get data from form and add it to array
    var name = req.body.homename;
    var image = req.body.homeimage;
    var description = req.body.descriptionform;
    var owner={
        id:req.user._id,
        firstname:req.user.firstname
    }
    var newpg = {
                  name:name,  
                  image:image,
                  description:description,
                  owner:owner
                }
   
    // pgarr.push(newpg);
    Homes.create(newpg,function(err,home){
        if(err){
            console.log("ERROR: ");
            console.log(err);
        }
        else{
            // console.log("YOUR HOME IS ADDED!");
            // console.log(home);
            res.redirect("payingguests");
        }
    });
    // redirect to /payingguests
    
});

// NEW : show form to create new home
router.get("/payingguests/addpg",isLoggedIn,function(req,res){
  res.render("addpg.ejs");
});

// SHOW route : to show a one selected home
router.get("/payingguests/:id",isLoggedIn,function(req,res){
    // find pghome with that id
    Homes.findById(req.params.id).populate("comments").exec(function(err,detailhome){   //question
        if(err){
            console.log("ERROR: ");
            console.log(err);
        }
        else{
                // render to the page of that pghome
                res.render("ahome",{homeinfo:detailhome});
        }
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
}

module.exports=router;