const mongoose = require('mongoose')


// Schema for data input from user 
const dataSchema = new mongoose.Schema(
    {

        username:{
            type : String ,
            required : true ,
            trim : true

        },

        community :{
            type : String ,
            required : true ,
            trim : true
        },

        data:{
            required : true ,
            type : [String],
        },

        date: {
            type : String,
            required : true ,
            trim : true
        },

        likes:{
            type : Number ,
            default : 0 ,
        },

        comments:{
            type : [],
            default : [],

        },

        replies:{
            type : [],
            default : [],

        },
    }
)

// Model of dataSchema 
const dataModel = new mongoose.model('inputdatas' ,dataSchema )

module.exports = {
    dataModel,
}