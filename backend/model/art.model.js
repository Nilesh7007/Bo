const mongoose = require("mongoose")

const artSchema = mongoose.Schema({

    title: {type:String,required:true},
    body: {type:String,required:true},
    user: {type:String,required:true},
    userID:{type:String,required:true},
    category:{type:String,required:true},
    live: {type:Boolean,required:true}

},{
    versionKey:false
})

const ArtModel = mongoose.model("art",artSchema)

module.exports = {ArtModel}


// {
//     "title": "nilesh",
//     "body": "nilesh@gmail.com",
//     "user": "nilesh",
//     "userID":"shevgaon",
    // "category":"okay",
        // "live" : true
// }
// title: String
// body: String
// user: String
// userID: String
// category: String
// live: Boolean



// {
//     "title": "Blog on coding",
//     "body": "All about coding",
//      "category":"front",
//         "live" : true
// }