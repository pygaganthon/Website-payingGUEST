var express = require("express");
var router   = express.Router();
var Homes   = require("../models/homes");
var Comments   = require("../models/comments");

// NEW(form)/SHOW : /payingguests/:id
// CREATE: /payingguests/:id/comment redirect to NEW/SHOW

router.post("/payingguests/:id/comment",isLoggedIn,function(req,res){
    // var reviewname    = req.body.myname;
    // var reviewcomment = req.body.mycomment;
    
    var commentcomp = {
        text:req.body.text,
        author:{
            id:req.user._id,
            firstname:req.user.firstname
            }
        }
     
    //add this comment to the home id
   
            Comments.create(commentcomp,function(err,comment){
                if(err){
                    console.log("error!");
                }
                else{
                     Homes.findOne({_id:req.params.id},function(err,home){        
                       if(err){
                                console.log("ERROR!!");
                            }
                            else{
                                 home.comments.push(comment);
                                 home.save(function(err,data){
                                        if(err){
                                            console.log("error!");
                                            }
                                        else{
                                            Homes.findById(req.params.id).populate("comments").exec(function(err,detailhome){   //question
                                            if(err){
                                                        console.log("ERROR: ");
                                                        console.log(err);
                                                    }
                                                    else{
                                                            // render to the page of that pghome
                                                            // res.render("ahome",{homeinfo:detailhome});
                                                            res.redirect("/payingguests/"+detailhome._id);
                                                    }
                                                });
                                            
                                            
                                            } 
                                        });
                                }     
                   });
                   
                                         
                   } 
            });
            
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
}

module.exports = router;