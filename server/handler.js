// homeHandler (get)

const homeHandler = async(req,res)=>{
    try {
        res.send("Welcome to Dev'sDev")
    } catch (error) {
        res.status(500).json(error)
    }
}

const readData = async(req,res)=>{
    try {
        res.send("Read API Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    homeHandler,
    readData,
}