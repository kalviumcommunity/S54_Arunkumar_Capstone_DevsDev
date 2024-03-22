const { DataModel } = require("./schema/dataSchema")

// homeHandler (get)
const homeHandler = async(req,res)=>{

    try {
        res.send("Welcome to Dev'sDev")
    } catch (error) {
        res.status(500).json(error)
    }

}

// Reading API
const readData = async(req,res)=>{

    try {
        const readDatas = await DataModel.find()
        res.status(200).json(readDatas)
    } catch (error) {
        res.status(500).json(error)
    }

}

//Creating Data
const createData = async(req,res)=>{
    
    try {

        const InputData = req.body

        await DataModel.create(InputData)

        res.status(201).json({data : InputData , message : "data added successfully"})
        

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
}

// Updating Data  
const updateData = async(req,res)=>{

    try {
        res.status(200).send("Data updated Successfully")
    } catch (error) {
        res.status(500).json(error)
    }

}

module.exports = {

    homeHandler,
    readData,
    createData,
    updateData,

}