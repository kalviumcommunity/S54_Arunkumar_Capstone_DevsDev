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
        res.status(200).send("Read API Successfully")
    } catch (error) {
        res.status(500).json(error)
    }

}

//Creating Data
const createData = async(req,res)=>{

    try {
        res.status(201).send("Successfully posted using post request")
    } catch (error) {
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