var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),  // to convert req.body to object : key val format 
    Homes       = require("./models/homes"),
    Comments    = require("./models/comments"),
    seedDB   = require("./seed"),
    users  = require("./models/users"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
    
var authroutes = require("./routes/auth");    
var commentroutes = require("./routes/comment");    
var pguestsroutes = require("./routes/pguests");    

// removes all homes and comments and add new homes & comments (with new id)
// seedDB();
// mongoose.connect("mongodb://gagancrocks:FARZi6!1@ds161104.mlab.com:61104/payingguest");
mongoose.connect(process.env.DATABASEURL); // create homes database 

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
    secret:"Gagan is a thief.",
    resave:false,
    saveUninitialized:false
    }));
    
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(users.authenticate())); 
passport.serializeUser(users.serializeUser());  
passport.deserializeUser(users.deserializeUser());

app.use(function(req,res,next){
    res.locals.curruser=req.user;
    next();
});
    // Homes.create({
    //     name: "Madone house", 
    //     image:"https://i.ibb.co/znC4CFT/neonbrand-263851-unsplash.jpg",
    //     description:"Madone house is very beautiful with an adjacent lake. Visit in Summers."
    // },function(err,home){
    //     if(err){
    //         console.log("ERROR: ");
    //         console.log(err);
    //     }
    //     else{
    //         console.log("YOUR HOME IS ADDED!");
    //         console.log(home);
    //     }
    // });
app.use(authroutes);
app.use(commentroutes);
app.use(pguestsroutes);


app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Connected to payingguest server:"); 
});






