const mongoose = require('mongoose')


// Schema for data input from user 
const dataSchema = new mongoose.Schema(
    {
        userId:{
            type : String ,
            required : true ,
            trim : true
        },
        username:{
            type : String ,
            required : true ,
            trim : true
        },
        pfp: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function(v) {
                    // Regular expression to validate URL format
                    return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
                },
                message: props => `${props.value} is not a valid URL!`
            }
        },
        community :{
            type : String ,
            required : true ,
            trim : true
        },
        
        title:{
            required : true ,
            type : String,
            trim : true
        },

        description:{
            required : true ,
            type : String,
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

            {   userId:{
                    type : String,
                    required:true,
                    trim : true
            },
                username:{
                    type : String,
                    required:true,
                    trim : true
            },
                comment: {
                    type : String,
                    required:true,
                    trim : true
                },
                date : {
                    type : String,
                    required:true,
                    trim : true
                },
                pfp : {
                    type : String,
                    required:true,
                    trim : true
                }
            }
        ]
    }
)

// Model of dataSchema 
const DataModel = new mongoose.model('inputdatas' ,dataSchema )

module.exports = {
    DataModel,
}