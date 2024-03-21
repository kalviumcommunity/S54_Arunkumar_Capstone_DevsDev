const mongoose = require('mongoose')

const mongoConnect = async() => {
    
    try{await mongoose.connect(process.env.MONGO_URI)

    console.log("Connected To Database")

    }

    catch(err){
        console.log(`Failed to connect database : ${err} `)
    }
}

module.exports = {mongoConnect}