const { DataModel } = require("./schema/dataSchema");
const { savedModel, userModel } = require("./schema/userData");

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

const createUser = async (req, res) => {
    try {
        const inputData = req.body;
        const { userId } = inputData;

        const existingUser = await userModel.findOne({ 'userId': userId });
        if (existingUser) {
            return res.status(200).json({ data: inputData, message: "User already exists" });
        }

        await userModel.create(inputData);

        return res.status(201).json({ data: inputData, message: "User added successfully" });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


//Saving Data
const saveData = async (req, res) => {
    try {
        const inputData = req.body;
        const { userId } = inputData;

        const data = await DataModel.findOne({ 'userId': userId });
        if (data) {

            await userModel.updateOne(
                { 'userId': userId },
                { $push: { likedproducts: data } }
            );

            return res.status(200).json({ data: inputData, message: " Post saved successfully" });
        }

        await userModel.create(inputData);

        return res.status(201).json({ data: inputData, message: "User added successfully" });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Updating Data  
const updateData = async(req,res)=>{
    
    try {
        res.status(200).send("Data updated Successfully")
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
}

// Updating pfp  
const updatePfp = async (req, res) => {
    const id = req.params.id;
    
    try {
        const { pfp } = req.body;
        // console.log('pfp: ', pfp);
        
        // Ensure that both pfp and username are provided
        if (!pfp || !id) {
            return res.status(400).json({ message: "Both pfp and username are required." });
        }
        
        // Construct the update object to apply partial updates
        const updateObject = {};
        if (pfp) {
            updateObject.pfp = pfp;
        }
        
        // Update the documents matching the username
        const response = await DataModel.updateMany(
            { userId: id },
            { $set: updateObject } 
        );
        
        if (response) {
            return res.status(200).json({ message: "Profile picture updated successfully" });
        } else {
            return res.status(404).send("No data found for the provided username");
        }
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


// Deleting Data 
const deleteData = async (req, res) => {
    try {
        const inputData = req.body;
        const { userId } = inputData;
        console.log('userId: ', userId);

        const data = await DataModel.findOne({ 'userId': userId });

        if (data) {
            await userModel.updateOne(
                { 'userId': userId },
                { $pull: { likedproducts: data } }
            );

            return res.status(200).json({ data: inputData, message: " Post removed successfully" });
        }

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    
    homeHandler,
    readData,
    createData,
    updateData,
    readSingleData,
    updatePfp,
    saveData,
    createUser,
    deleteData,

}