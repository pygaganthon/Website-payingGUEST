var mongoose = require("mongoose"),
   passportLocalMongoose = require("passport-local-mongoose");

var usersSchema = new mongoose.Schema({
   firstname:String,
   lastname:String,
   // bdate:String,  // try this {type:date}
   email:String,
   username:String,
   password:String
});

usersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("users",usersSchema);

