var mongoose    = require("mongoose");

var homesSchema = new mongoose.Schema({
    name: String,
    image: String,
    description:String,
    owner:{
       id:{ type: mongoose.Schema.Types.ObjectId,
        ref:"users"
       },
       firstname:String
    },
        
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }]
});

var Homes = mongoose.model("Homes",homesSchema);

module.exports = Homes;
