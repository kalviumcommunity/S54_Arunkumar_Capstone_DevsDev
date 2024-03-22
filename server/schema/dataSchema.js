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

        comments:[
            {
                commentText : {
                    type : String,
                    required:true,
                },
                replies:[{
                    type : String,
                    required:true,
                }],
            }
        ]
    }
)

// Model of dataSchema 
const DataModel = new mongoose.model('inputdatas' ,dataSchema )

module.exports = {
    DataModel,
}