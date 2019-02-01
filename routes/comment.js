var express = require("express");
var router   = express.Router();
var Homes   = require("../models/homes");
var Comments   = require("../models/comments");

// NEW(form)/SHOW : /payingguests/:id
// CREATE: /payingguests/:id/comment redirect to NEW/SHOW

router.post("/payingguests/:id/comment",ownership,function(req,res){
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
                                                            
                                                            req.flash("success","Successfully Added Review!");
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

router.get("/payingguests/:id/comment/:comment_id/edit",editownership,function(req,res){
    // var reviewname    = req.body.myname;
    // var reviewcomment = req.body.mycomment;
           Comments.findById(req.params.comment_id,function(err,foundcomment){
              if(err){
                  console.log(err);
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
                                                                
                                                                
                                                                 res.render("aftereditcomment",{homeinfo:detailhome , commentinfo:foundcomment});
                                                            }
                                                    });
                            }
              });
              
           });

    
router.put("/payingguests/:id/comment/:comment_id",editownership,function(req,res){

    var data = {
        text:req.body.text
    }
   Comments.findOneAndUpdate({_id:req.params.comment_id},data,function(err,updated){
            if(err){
                res.redirect("/payingguests/"+req.params.id+"/comment/"+req.params.comment_id);
            }else{
                
                    req.flash("success","Successfully Updated Review!");
                   res.redirect("/payingguests/"+req.params.id);                 
            }
            });
});
            


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    
    res.redirect("/signin");
}

function ownership(req,res,next){
    if(req.isAuthenticated()){
        Homes.findById(req.params.id,function(err,home){
            if(err){
                res.redirect("back");
            }
           else{
               if(!home.owner.id.equals(req.user._id)) {
               next();
                }
                else{
                    
                    
                    req.flash("error","Permission Denied!");
                    res.redirect("back");
                }
              }
        });
    }
    else{
        res.redirect("back");
    }
}

function editownership(req,res,next){
    if(req.isAuthenticated()){
        Comments.findById(req.params.comment_id,function(err,comment){
            if(err){
                res.redirect("back");
            }
           else{
               if(comment.author.id.equals(req.user._id)) {
               next();
                }
                else{
                    req.flash("error","Permission Denied!");
                    res.redirect("back");
                }
              }
        });
    }
    else{
        res.redirect("back");
    }
}

module.exports = router;