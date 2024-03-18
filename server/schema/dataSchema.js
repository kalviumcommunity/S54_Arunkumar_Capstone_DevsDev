const mongoose = require('mongoose')

// Schema for comments 
const commentSchema = new mongoose.Schema({

    comment : {
            type : String ,
            required : true ,
            trim : true
    },

    likes:{
        type : Number ,
        default : 0 ,
    },

    replies:{
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'userComments',
    }

})

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
            type : [String],
            required : true ,
        },

        date: {
            type : Date ,
            required : true ,
            trim : true
        },

        comments:{
            type : [commentSchema],
            default : [],

        }
    }
)

// Model of dataSchema 
const dataModel = new mongoose.model('inputData' ,dataSchema )

// Model of Comment 
const commentModel = new mongoose.model('userComments' ,commentSchema )

module.exports = {
    dataModel,
    commentModel,
}