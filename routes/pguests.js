var express = require("express");
var router   = express.Router();
var Homes   = require("../models/homes");
var passport = require("passport");
var multer = require("multer");
var cloudinary = require('cloudinary');
var Comments = require("../models/comments")
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Please upload image files!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})


cloudinary.config({ 
  cloud_name: 'dxdqegidg', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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
router.post("/payingguests",isLoggedIn,upload.single('homeimage'),function(req,res){
    // get data from form and add it to array
    cloudinary.uploader.upload(req.file.path, function(result) {
      
            var name = req.body.homename;
            var price = req.body.homeprice;
            var image = result.secure_url;
            var description = req.body.descriptionform;
            var owner={
                id:req.user._id,
                firstname:req.user.firstname
            }
            var newpg = {
                  name:name,  
                  image:image,
                  price:price,
                  description:description,
                  owner:owner
                }
      
              Homes.create(newpg, function(err, home) {
                if (err) {
                //   req.flash('error', err.message);
                  console.log("ERROR");
                  return res.redirect('addpg');
                }
                
                req.flash("success","Successfully added Guest Home!");
                res.redirect('/payingguests/');
              });
        });
}); 
//     var name = req.body.homename;
//     var image = req.body.homeimage;
//     var description = req.body.descriptionform;
//     var owner={
//         id:req.user._id,
//         firstname:req.user.firstname
//     }
//     var newpg = {
//                   name:name,  
//                   image:image,
//                   description:description,
//                   owner:owner
//                 }
   
//     // pgarr.push(newpg);
//     Homes.create(newpg,function(err,home){
//         if(err){
//             console.log("ERROR: ");
//             console.log(err);
//         }
//         else{
//             // console.log("YOUR HOME IS ADDED!");
//             // console.log(home);
//             res.redirect("payingguests");
//         }
//     });
//     // redirect to /payingguests
    
// });

// NEW : show form to create new home
router.get("/payingguests/addpg",isLoggedIn,function(req,res){
  res.render("addpg.ejs");
});

// SHOW route : to show a one selected home
router.get("/payingguests/:id",function(req,res){
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

// edit the home post  // ??? WHY NOT isLoggedIn here?
router.get("/payingguests/:id/edit",ownership,function(req,res){
    Homes.findById(req.params.id,function(err,foundhome){
        if(err){
            console.log(err);
        }
        else{
           res.render("edit",{homeinfo:foundhome}); 
        }
    });
    
});

router.put("/payingguests/:id",ownership,upload.single('homeimage'),function(req,res){
    // find and update the home
    // console.log(curruser._id);
    cloudinary.uploader.upload(req.file.path, function(result) {
        
            var data = {
                name:req.body.homename,
                price:req.body.homeprice,
                image:result.secure_url,
                description:req.body.descriptionform
            }
            // Homes.findByIdAndUpdate(req.params.id,data,function(err,updated)
            Homes.findOneAndUpdate({_id:req.params.id},data,function(err,updated)
            {
             if(err){
                    
                    res.redirect("/payingguests");
                }
                else{
                    
                    req.flash("success","Successfully edited Guest Home!");
                   res.redirect("/payingguests/"+req.params.id);
                }    
            });
    // redirect found values to page
});
});

router.delete("/payingguests/:id",ownership,function(req,res){
    
    Homes.findByIdAndRemove(req.params.id, function(err,home){
       if(err){
           res.redirect("/payingguests")
       } 
       else {
           Comments.deleteMany({_id:{$in:home.comments}}, function(err){
               if (err) {
                console.log(err);
                }
                else{
                    
                req.flash("success","Successfully Deleted Guest Home!");
               res.redirect("/payingguests")
                }
                    
                });
           
       }
    });
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You must SignIn to Add your Guest Home!");
    res.redirect("/signin");
}
function ownership(req,res,next){
    if(req.isAuthenticated()){
        Homes.findById(req.params.id,function(err,home){
            if(err){
                req.flash("error","NOT FOUND!")
                res.redirect("back");
            }
           else{
               if(home.owner.id.equals(req.user._id)) {
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
        req.flash("error","Please SignIn First!");
        res.redirect("back");
    }
}

module.exports=router;