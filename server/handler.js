const { DataModel } = require("./schema/dataSchema")

// homeHandler (get)
const homeHandler = async(req,res)=>{

    try {
        res.send("Welcome to Dev'sDev")
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

// Reading API
const readData = async(req,res)=>{

    try {
        const readDatas = await DataModel.find()
        res.status(200).json(readDatas)
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

// Reading single data 

const readSingleData = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await DataModel.findOne({ '_id': id });

        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//Creating Data
const createData = async(req,res)=>{
    
    try {

        const InputData = req.body

        await DataModel.create(InputData)

        res.status(201).json({data : InputData , message : "Post added successfully"})
        

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
}

// Updating Data  
const updateData = async(req,res)=>{

    try {
        res.status(200).send("Data updated Successfully")
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

// Updating Data  
const updatePfp = async (req, res) => {
    try {
        const { pfp , username} = req.body;

        // Ensure that both pfp and username are provided
        if (!pfp || !username) {
            return res.status(400).json({ message: "Both pfp and username are required." });
        }

        // Update the documents matching the username
        const response = await DataModel.updateMany(
            { username: username },
            { $set: { pfp: pfp } } // Use $set to update specific fields
        );

        // Check if any documents were updated
        if (response.nModified > 0) {
            return res.status(200).send("Data updated Successfully");
        } else {
            return res.status(404).send("No data found for the provided username");
        }
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {

    homeHandler,
    readData,
    createData,
    updateData,
    readSingleData,
    updatePfp

}