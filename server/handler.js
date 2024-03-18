// homeHandler (get)

const homeHandler = async(req,res)=>{
    res.send("Welcome to Dev'sDev")
}

const readData = async(req,res)=>{
    res.send("Read API Successfully")
}

module.exports = {
    homeHandler,
    readData
}