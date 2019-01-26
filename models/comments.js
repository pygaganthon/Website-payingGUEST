var mongoose = require("mongoose");

var commentsSchema = new mongoose.Schema({
    text:String,
    author:{
       id:{ type: mongoose.Schema.Types.ObjectId,
        ref:"users"
       },
        firstname:String
    }
    
    
    
});

var Comments = mongoose.model("Comments",commentsSchema);

module.exports = Comments;