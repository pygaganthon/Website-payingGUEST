// first clea the database and then add initial data to db

var mongoose = require("mongoose");
var Homes    = require("./models/homes");
var Comments = require("./models/comments");
var users    = require("./models/users");
var data = [
                {name: "lake housea", image:"https://i.ibb.co/rKPqxVZ/alexandra-gorn-485551-unsplash.jpg",description:"Paradise at The Point! This luxurious 4 bedroom 4.5 bath Dienst-built estate on the Lake Norman peninsula is a dream home in a high-end community that's home to Trump National Golf Club. Spanning over 4900 SF, this magnificent waterfront residence graced by soaring ceilings and wall-to-wall windows is a haven for gazing at Lake Norman views from multiple vantage points. The grand entryway with a sweeping staircase draws you into a voluminous layout made for entertaining. "},
                {name: "a sweet houase in valley", image:"https://i.ibb.co/s9QHkKm/patrick-perkins-340017-unsplash.jpg",description:"Paradise at The Point! This luxurious 4 bedroom 4.5 bath Dienst-built estate on the Lake Norman peninsula is a dream home in a high-end community that's home to Trump National Golf Club. Spanning over 4900 SF, this magnificent waterfront residence graced by soaring ceilings and wall-to-wall windows is a haven for gazing at Lake Norman views from multiple vantage points. The grand entryway with a sweeping staircase draws you into a voluminous layout made for entertaining. "},
                {name: "tree house in a forest", image:"https://i.ibb.co/rs7fPKt/flaunter-com-237602-unsplash.jpg",description:"Paradise at The Point! This luxurious 4 bedroom 4.5 bath Dienst-built estate on the Lake Norman peninsula is a dream home in a high-end community that's home to Trump National Golf Club. Spanning over 4900 SF, this magnificent waterfront residence graced by soaring ceilings and wall-to-wall windows is a haven for gazing at Lake Norman views from multiple vantage points. The grand entryway with a sweeping staircase draws you into a voluminous layout made for entertaining. "},
                {name: "home suitable for camping", image:"https://i.ibb.co/XDczkDj/jazmin-quaynor-84021-unsplash.jpg",description:"Paradise at The Point! This luxurious 4 bedroom 4.5 bath Dienst-built estate on the Lake Norman peninsula is a dream home in a high-end community that's home to Trump National Golf Club. Spanning over 4900 SF, this magnificent waterfront residence graced by soaring ceilings and wall-to-wall windows is a haven for gazing at Lake Norman views from multiple vantage points. The grand entryway with a sweeping staircase draws you into a voluminous layout made for entertaining. "},
                {name: "safari house", image:"https://i.ibb.co/GRdz2nf/radek-grzybowski-144617-unsplash.jpg",description:"Paradise at The Point! This luxurious 4 bedroom 4.5 bath Dienst-built estate on the Lake Norman peninsula is a dream home in a high-end community that's home to Trump National Golf Club. Spanning over 4900 SF, this magnificent waterfront residence graced by soaring ceilings and wall-to-wall windows is a haven for gazing at Lake Norman views from multiple vantage points. The grand entryway with a sweeping staircase draws you into a voluminous layout made for entertaining. The 2-story great room with French doors to the rear deck is the dramatic focal point of the main level, accompanied by an elegant formal dining room, tremendous chef's kitchen, den/family room with a marble fireplace and glass doors to the backyard, and home office with gorgeous built-ins. The divine master suite presents tray ceilings, massive windows, a terrace overlooking the water, and an opulent ensuite bath will a soaking tub and separate glass shower. The lower level houses a large rec room with wood floors and a wet bar, billiards room, and 2nd living quarters with a full kitchen. Laundry is conveniently located on the main and lower levels. Park your boat at the common boat slip (one of only 3) accessed via boardwalk behind the house."},
                {name: "Madone house", image:"https://i.ibb.co/znC4CFT/neonbrand-263851-unsplash.jpg",description:"Paradise at The Point! This luxurious 4 bedroom 4.5 bath Dienst-built estate on the Lake Norman peninsula is a dream home in a high-end community that's home to Trump National Golf Club. Spanning over 4900 SF, this magnificent waterfront residence graced by soaring ceilings and wall-to-wall windows is a haven for gazing at Lake Norman views from multiple vantage points. The grand entryway with a sweeping staircase draws you into a voluminous layout made for entertaining. "}
    ]
// wait untill remove all existing HOMEdata and then add all home data

function SeedDB(){
    Comments.remove({},function(err){});
    users.remove({},function(err){});
    Homes.remove({},function(err){});
    // Homes.remove({},function(err){
    //     // if(err){
    //     //     console.log("ERROR!!!")
    //     // }
    //     //     console.log("removed homes");
    //     //     Comments.remove({},function(err){
    //     //         if(err){
    //     //             console.log("ERROR!!!");
    //     //         }
                
    //     //      data.forEach(function(item){
    //     //         Homes.create(item,function(err,home){
    //     //             if(err){
    //     //                 console.log("ERROR!!!")
    //     //                   }
    //     //             else{
                        
    //     //               console.log("added a home");
                       
    //     //                     // create one same comment for each homes
    //     //                       Comments.create({
    //     //                           text:"It was so comfortable staying here. I lived here with my family for one year.",
    //     //                           author:"Mark"
    //     //                       },function(err,comment){
    //     //                           if(err){
    //     //                             console.log("ERROR!!!")
    //     //                                     }
    //     //                             else{
    //     //                                 home.comments.push(comment); //comments is object name like name, image
    //     //                                 home.save();
    //     //                                 console.log("added a new comment");
    //     //                             }
    //     //                       });
    //     //                 }
    //     //             });
    //     //     });
            
    //     // });
        
    // });

}

module.exports = SeedDB;


